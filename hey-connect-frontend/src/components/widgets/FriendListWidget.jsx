import React, { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Friend } from "../commons/Friend";
import { WidgetWrapper } from "../commons/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setUserFriends } from "../../state/userSlice";
import axios from "axios";

export function FriendListWidget({ userId }) {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.userSlice.token);
  const { friends } = useSelector((state) => state.userSlice.user);

  const getFriends = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${userId}/friends`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { userFriends } = response.data;

      console.log({ userFriends });

      dispatch(setUserFriends({ friends: userFriends }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}
