import createHttpError from "http-errors";
import { decodeToken } from "../utils/decode-token.js";

export async function authorize(req, res, next) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return next(createHttpError(401, "Token not found"));
  }

  const [bearer, token] = bearerToken.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(createHttpError(401, "Invalid token"));
  }

  const jwt = await decodeToken(token);

  if (!jwt) {
    return next(createHttpError(401, "Invalid token"));
  }

  req.token = jwt;

  next();
}
