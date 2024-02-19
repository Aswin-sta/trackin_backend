import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";

const jwtVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Token not provided" });
    }

    const processedToken = token.split("Bearer ")[1];

    const publicKeyPath = "src/authorization/public.pem";
    const publicKey = fs.readFileSync(publicKeyPath);

    jwt.verify(processedToken, publicKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      } else {
        res.locals.decodedToken = decoded;
        next();
      }
    });
  } catch (error) {
    console.error("Error in JWT verification:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default jwtVerification;
