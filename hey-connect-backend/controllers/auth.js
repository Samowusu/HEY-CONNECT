import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

import User from "../models/User.js";
import BadRequestError from "../errors/badRequest.js";
import UnauthenticatedError from "../errors/unauthenticated.js";
// REGISTER USER
export const register = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
  } = req.body;

  let filename;

  if (req.file) {
    filename = req.file.filename;
  }

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
    fileName: filename,
    viewedProfile: Math.floor(Math.random() * 10000),
    impressions: Math.floor(Math.random() * 10000),
  });
  const userObject = newUser.toObject({
    transform: (doc, ret) => {
      delete ret.password;
    },
  });

  res.status(StatusCodes.CREATED).json({ savedUser: userObject });
};

// LOGIN USER
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid email");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid password");
  }
  // compare password
  const token = user.createJWT();
  const userJson = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    picturePath: user.fileName,
    fileName: user.fileName,
  };

  console.log({ userJson });
  res.status(StatusCodes.OK).json({ user: userJson, token });
};
