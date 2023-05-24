import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is reqired"],
    },
    firstName: {
      type: String,
      required: [true, "first name can't be empty"],
    },
    lastName: {
      type: String,
      required: [true, "last name can't be empty"],
    },
    location: String,
    postPicture: String,
    post: String,
    userPicturePath: String,
    likes: {
      type: Map, //the type of likes is Map(object)
      of: Boolean, //with booleans as the value type
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
