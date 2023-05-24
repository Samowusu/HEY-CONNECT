import React from "react";
import { NavBar } from "../../components/NavBar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { UserWidget } from "../../components/widgets/UserWidget";
import { AllPostsWidget } from "../../components/widgets/AllPostsWidget";
import { AdvertWidget } from "../../components/widgets/AdvertWidget";
import { FriendListWidget } from "../../components/widgets/FriendListWidget";
import { NewPostWidget } from "../../components/widgets/NewPostWidget";

export function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id: userId } = useSelector((state) => state.userSlice.user);

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <NewPostWidget />
          <AllPostsWidget />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={userId} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
