import { Box } from "@mui/material";
import { useSelector } from "react-redux";

export function UserImage({ size = "60px", imageProp }) {
  const { fileName } = useSelector((state) => state.userSlice.user);

  const imageSrc = imageProp ?? fileName;
  console.log({ fileName, imageProp });

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={"100%"}
        height={"100% "}
        alt="user"
        src={`https://hey-connect-server.onrender.com/images/${imageSrc}`}
      />
    </Box>
  );
}
