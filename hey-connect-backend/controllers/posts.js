import Post from "../models/Post.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const createPost = async (req, res, next) => {
  const { userId } = req.user;
  const { post, postPicture } = req.body;
  let filename;

  if (req.file) {
    filename = req.file.filename;
  }

  const user = await User.findById(userId);
  const newPost = await Post.create({
    userId,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    post,
    fileName: filename,
    postPicture,
    userPicturePath: user.fileName,
    likes: {},
    comments: [],
  });

  console.log({ newPost });

  res.status(StatusCodes.CREATED).json(newPost);
};

export const getFeedPosts = async (req, res, next) => {
  const posts = await Post.find();

  res.status(StatusCodes.OK).json({ hits: posts.length, posts });
};

export const getUserPosts = async (req, res, next) => {
  const { userId } = req.params;
  const userPosts = await Post.find({ userId });

  res.status(StatusCodes.OK).json({ hits: userPosts.length, userPosts });
};

export const likePost = async (req, res, next) => {
  const { postId } = req.params;
  const { userId } = req.body;
  const post = await Post.findById(postId);
  const isLiked = post.likes.has(userId);

  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { likes: post.likes },
    { new: true }
  );
  res.status(StatusCodes.OK).json(updatedPost);
};
