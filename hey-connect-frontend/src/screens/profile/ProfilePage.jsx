import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { FriendListWidget } from "../../components/widgets/FriendListWidget";
import { UserWidget } from "../../components/widgets/UserWidget";
import { NewPostWidget } from "../../components/widgets/NewPostWidget";
import { AllPostsWidget } from "../../components/widgets/AllPostsWidget";
import { Box, useMediaQuery } from "@mui/material";
import axios from "axios";

export function ProfilePage() {
  const [userState, setUserState] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.userSlice.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://hey-connect-server.onrender.com/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { user } = response.data;
      setUserState(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!userState) {
    return <p>Loading....</p>;
  }

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <AllPostsWidget isProfile />
        </Box>
      </Box>
    </Box>
  );
}
