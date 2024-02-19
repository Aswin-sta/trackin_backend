import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import fs from "fs";
import generateJWT from "./generateJWT";
import { UUID } from "crypto";

const refreshToken = async (req: Request, res: Response) => {
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

    jwt.verify(
      processedToken,
      publicKey,
      { ignoreExpiration: true },
      (err, decodedToken) => {
        if (err) {
          return res
            .status(401)
            .json({ error: "Unauthorized - Invalid token" });
        } else {
          const decoded = decodedToken as JwtPayload;
          const newToken = generateJWT(
            decoded?.user_id as UUID,
            decoded?.user_role,
            decoded?.user_name,
            decoded?.manager_id as UUID
          );

          return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            data: {
              token: newToken,
              user_role: decoded?.user_role,
              user_name: decoded?.user_name,
            },
          });
        }
      }
    );
  } catch (error) {
    console.error("Error in token refresh:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default refreshToken;
