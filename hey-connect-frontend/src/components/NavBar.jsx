import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, logoutUser } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
import { FlexBox } from "./commons/FlexBox";

export function NavBar() {
  const [mobileMenuIsToggledState, setMobileMenuIsToggledState] =
    useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  // COLORS
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user?.firstName} ${user?.lastName} `;

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <FlexBox padding="1rem 6%" backgroundColor={alt}>
      <FlexBox gap={"1.75rem"}>
        <Typography
          fontWeight={"bold"}
          fontSize="clamp(1rem,2rem,2.5rem)"
          color={"primary"}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          hey-connect!
        </Typography>
        {isNonMobileScreen && (
          <FlexBox
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding={"0.1rem 1.5rem"}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBox>
        )}
      </FlexBox>

      {/* DESKTOP NAV */}
      {isNonMobileScreen ? (
        <FlexBox gap={"2rem"}>
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px", color: dark }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  paddingRight: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBox>
      ) : (
        <IconButton
          onClick={() => setMobileMenuIsToggledState((prevState) => !prevState)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreen && mobileMenuIsToggledState && (
        <Box
          position={"fixed"}
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth={"500px"}
          minWidth="300px"
          backgroundColor={background}
        >
          <Box display={"flex"} justifyContent={"flex-end"} padding="1rem">
            <IconButton
              onClick={() =>
                setMobileMenuIsToggledState((prevState) => !prevState)
              }
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBox
            gap={"3rem"}
            justifyContent="center"
            flexDirection={"column"}
          >
            <IconButton onClick={() => dispatch(toggleTheme())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px", color: dark }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  padding: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    paddingRight: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBox>
        </Box>
      )}
    </FlexBox>
  );
}
