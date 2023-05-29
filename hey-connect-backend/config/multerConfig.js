import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import crypto from "crypto";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// FILE STORAGE
//store uploaded files in mongoDB.
//generate a random filename, encrypt it and store it in the DB
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((res, rej) => {
      //encrypt filename before storing it
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return rej(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: "uploads",
        };
        res(fileInfo);
      });
    });
  },
});

export const upload = multer({ storage });
