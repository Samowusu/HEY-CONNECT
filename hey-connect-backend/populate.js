import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connection.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { posts, users } from "./mockData/mockData.js";

const populateDB = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    await User.deleteMany();
    await Post.deleteMany();
    await User.insertMany(users);
    await Post.insertMany(posts);
    console.log("successfully populated the database");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populateDB();
