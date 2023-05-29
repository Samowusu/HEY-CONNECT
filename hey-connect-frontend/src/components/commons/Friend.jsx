import React from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserFriends } from "../../state/userSlice";
import { FlexBox } from "./FlexBox";
import { UserImage } from "./UserImage";
import axios from "axios";

export function Friend({ friendId, name, subtitle, userPicturePath }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.userSlice.user);
  const token = useSelector((state) => state.userSlice.token);
  const friends = useSelector((state) => state.userSlice.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends?.find((friend) => friend._id === friendId);

  const addRemoveFriend = async () => {
    console.log("adding friends");
    const response = await axios.patch(
      `https://hey-connect-server.onrender.com/users/${_id}/friends/${friendId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { updatedFriends } = response.data;
    console.log({ updatedFriends });
    dispatch(setUserFriends({ friends: updatedFriends }));
  };
  return (
    <FlexBox>
      <FlexBox gap="1rem">
        <UserImage imageProp={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0); //refresh the page. needs a work around
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBox>
      <IconButton
        onClick={addRemoveFriend}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBox>
  );
}
