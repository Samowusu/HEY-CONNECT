import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const getUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select({ password: 0, email: 0 });
  console.log("user", user);
  res.status(StatusCodes.OK).json({ user });
};

export const getUserFriends = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  console.log("user friends", user);

  // friends is an array of friend IDs
  const userFriends = await Promise.all(
    user.friends.map((friendId) =>
      User.findById(friendId).select({ password: 0, email: 0, friends: 0 })
    )
  );
  console.log("friends", userFriends);
  res.status(StatusCodes.OK).json({ hits: userFriends.length, userFriends });
};

export const addRemoveFriend = async (req, res, next) => {
  const { friendId, userId } = req.params;

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  const userFriendIndex = user.friends.indexOf(friendId);
  const friendUserIndex = friend.friends.indexOf(userId);
  console.log({ userFriendIndex, friendUserIndex });
  if (userFriendIndex !== -1) {
    console.log("already a friend so remove");
    user.friends.splice(userFriendIndex, 1);
  } else if (friendUserIndex !== -1) {
    console.log("remove that user");
    friend.friends.splice(friendUserIndex, 1);
  } else {
    console.log("add new friend");
    user.friends.push(friendId);
    friend.friends.push(userId);
  }

  await user.save();
  await friend.save();

  const updatedFriends = await Promise.all(
    user.friends.map((friendId) =>
      User.findById(friendId).select({ password: 0, email: 0, friends: 0 })
    )
  );

  console.log("new friends", updatedFriends);
  res
    .status(StatusCodes.OK)
    .json({ hits: updatedFriends.length, updatedFriends });
};
