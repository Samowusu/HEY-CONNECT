import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB, { connectGridFS } from "./db/connection.js";
import notFound from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import authorizeUser from "./middleware/auth.js";
import { register } from "./controllers/auth.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import { upload } from "./config/multerConfig.js";
import { gfs } from "./db/connection.js";
// CONFIGURATIONS
dotenv.config();
const app = express();
//the code snippet below means the same as this
// *app.use("/assets", express.static("./public/assets"))*
// the one below is a better approach since it specifies an absolute
// path, hence it is easier to maintain it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

// FILE STORAGE
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// ROUTES
// app.post("/auth/register", upload.single("picture"), register);

//fetch images from the DB

app.get("/images/:filename", async (req, res) => {
  const { filename } = req.params;
  try {
    gfs.openDownloadStreamByName(filename).pipe(res);
  } catch (error) {
    res.send(`can't download file`);
  }
});

app.use("/auth", authRoute);
app.use("/users", authorizeUser, usersRoute);
app.use("/posts", authorizeUser, postsRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

// MONGOOSE CONNECTION

const port = process.env.PORT || 5000;
const init = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await connectGridFS(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(
        `image-upload branch: server is listening on port ${port}...`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

init();
