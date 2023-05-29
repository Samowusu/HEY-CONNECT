import { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { FlexBox } from "../commons/FlexBox";
import { Friend } from "../commons/Friend";
import { WidgetWrapper } from "../commons/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../state/postsSlice";
import axios from "axios";

export function PostWidget({
  postId,
  postUserId,
  name,
  post,
  location,
  postPicture,
  userPicturePath,
  fileName,
  likes,
  comments,
}) {
  const [isCommentsState, setIsCommentsState] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userSlice.token);
  const loggedInUserId = useSelector((state) => state.userSlice.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const handleLikePost = async () => {
    try {
      const response = await axios.patch(
        `https://hey-connect-server.onrender.com/${postId}/like`,
        { userId: loggedInUserId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedPost = response.data;
      dispatch(updatePost({ post: updatedPost }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WidgetWrapper mb={"2rem"}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {post}
      </Typography>
      {postPicture && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
          }}
          src={`https://hey-connect-server.onrender.com/images/${fileName}`}
        />
      )}
      <FlexBox mt="0.25rem">
        <FlexBox gap="1rem">
          <FlexBox gap="0.3rem">
            <IconButton onClick={handleLikePost}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBox>

          <FlexBox gap="0.3rem">
            <IconButton
              onClick={() => setIsCommentsState((prevState) => !prevState)}
            >
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBox>
        </FlexBox>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBox>
      {isCommentsState && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}
