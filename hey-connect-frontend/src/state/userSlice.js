import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },

    setUserFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      }
    },
  },
});

export const { loginUser, logoutUser, setUserFriends, toggleTheme, setMode } =
  userSlice.actions;
export default userSlice.reducer;
