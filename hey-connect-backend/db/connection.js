import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export let gfs;

export const connectGridFS = (url) => {
  try {
    const connect = mongoose.createConnection(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connect.once("open", () => {
      gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "uploads",
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
