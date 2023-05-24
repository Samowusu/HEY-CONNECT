import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";

const router = express.Router();

router.get("/:userId", getUser);
router.get("/:userId/friends", getUserFriends);
router.patch("/:userId/friends/:friendId", addRemoveFriend);

export default router;
