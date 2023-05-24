import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { FlexBox } from "../commons/FlexBox";
import { WidgetWrapper } from "../commons/WidgetWrapper";
import { UserImage } from "../commons/UserImage";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../state/postsSlice";
import axios from "axios";

export function NewPostWidget() {
  const dispatch = useDispatch();
  const [isImageState, setIsImageState] = useState(false);
  const [imageState, setImageState] = useState(null);
  const [postState, setPostState] = useState("");
  const { palette } = useTheme();
  const token = useSelector((state) => state.userSlice.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append("post", postState);
    if (imageState) {
      formData.append("picture", imageState);
      formData.append("postPicture", imageState.name);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/posts",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const post = response.data;
      console.log({ post });
      if (!post) return;

      const allPostsResponse = await axios.get("http://localhost:3001/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { posts } = allPostsResponse.data;
      console.log({ posts });

      dispatch(setPosts({ posts }));
      setImageState(null);
      setPostState("");
      setIsImageState(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WidgetWrapper mb="2rem">
      <FlexBox gap={"20px"}>
        <UserImage />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPostState(e.target.value)}
          value={postState}
          sx={{
            width: "90%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBox>
      {isImageState && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImageState(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBox>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!imageState ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBox>
                      <Typography>{imageState.name}</Typography>
                      <EditOutlined />
                    </FlexBox>
                  )}
                </Box>
                {imageState && (
                  <IconButton
                    onClick={() => setImageState(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBox>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBox>
        <FlexBox
          gap="0.25rem"
          onClick={() => setIsImageState((prevState) => !prevState)}
        >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBox>

        {isNonMobileScreens ? (
          <>
            <FlexBox gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBox>

            <FlexBox gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBox>

            <FlexBox gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBox>
          </>
        ) : (
          <FlexBox gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBox>
        )}

        <Button
          disabled={!postState}
          onClick={handleCreatePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBox>
    </WidgetWrapper>
  );
}
