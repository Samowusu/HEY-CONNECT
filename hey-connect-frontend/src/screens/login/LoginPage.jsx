import React, { useState } from "react";

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Form } from "../../components/Form";

export function LoginPage() {
  const [errorMessageState, setErrorMessageState] = useState("");

  const theme = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const handleErrorMessage = (errorMsg) => {
    setErrorMessageState(errorMsg);
  };
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          hey-connect!
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to hey-connect! the Social Media for the Traditional Council👹
          !
        </Typography>
        {Boolean(errorMessageState) && (
          <Typography
            sx={{
              color: theme.palette.primary.main,
              marginBottom: "10px",
            }}
          >
            {errorMessageState}
          </Typography>
        )}
        <Form onError={handleErrorMessage} />
      </Box>
    </Box>
  );
}
