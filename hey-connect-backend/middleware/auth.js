import jwt from "jsonwebtoken";
import UnauthorizedError from "../errors/unauthorized.js";

const authorizeUser = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthorizedError("Access Denied");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId, userEmail: payload.userEmail };
    next();
  } catch (error) {
    throw new UnauthorizedError("Authorization invalid");
  }
};

export default authorizeUser;
