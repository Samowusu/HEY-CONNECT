import { Navigate, Routes, Route } from "react-router-dom";
import { HomePage } from "./screens/home/HomePage";
import { LoginPage } from "./screens/login/LoginPage";
import { ProfilePage } from "./screens/profile/ProfilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./config/theme";

function App() {
  const mode = useSelector((state) => state.userSlice.mode);
  const isAuthorized = useSelector((state) => state.userSlice.token);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={isAuthorized ? <HomePage /> : <Navigate to={"/"} />}
          // element={<HomePage />}
        />
        <Route
          path="/profile/:userId"
          element={isAuthorized ? <ProfilePage /> : <Navigate to={"/"} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
