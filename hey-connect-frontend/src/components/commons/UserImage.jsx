import { Box } from "@mui/material";
import { useSelector } from "react-redux";

export function UserImage({ size = "60px", image }) {
  const { picturePath } = useSelector((state) => state.userSlice.user);

  const imageSrc = image ?? picturePath;

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={"100%"}
        height={"100% "}
        alt="user"
        src={`http://localhost:3001/assets/${imageSrc}`}
      />
    </Box>
  );
}
