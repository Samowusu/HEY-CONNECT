import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./customApi.js";

class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
