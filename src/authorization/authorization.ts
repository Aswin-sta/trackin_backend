import { Request, Response } from "express";
import { JwksClient } from "jwks-rsa";
import jwt from "jsonwebtoken";
import axios from "axios";
import UserManager from "../models/userManager";
import { UUID } from "crypto";
import generateJWT from "./generateJWT";
import updateUserOrCreate from "./updateUserOrCreate";
import {
  JWKS_PROVIDER_URL,
  graphMeEndpoint,
  graphMeManagerEndpoint,
} from "./endpoints";

const TENANT_ID = process.env.MS_TENANT_ID;
const CLIENT_ID = process.env.MS_CLIENT_ID;

const authorize = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Token not provided" });
    }

    const processedToken = token.split("Bearer ")[1];
    const decodedToken: any = jwt.decode(processedToken, { complete: true });

    if (!decodedToken || !decodedToken.header || !decodedToken.payload) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const jwksClientInstance = new JwksClient({
      jwksUri: JWKS_PROVIDER_URL,
    });

    const key: any = await jwksClientInstance.getSigningKey(
      decodedToken.header.kid
    );
    const publicKey = key.getPublicKey();

    jwt.verify(processedToken, publicKey, {
      audience: CLIENT_ID,
      issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
      algorithms: ["RS256"],
    });

    const now = Math.floor(Date.now() / 1000);
    const notBefore = decodedToken.payload.nbf;
    const expiresAt = decodedToken.payload.exp;

    if (now >= notBefore && now < expiresAt) {
      const ssoId = decodedToken.payload.oid;

      const userData = await axios.get(graphMeEndpoint, {
        headers: {
          Authorization: req.headers.proxyauthorization,
        },
      });

      const managerData = await axios.get(graphMeManagerEndpoint, {
        headers: {
          Authorization: req.headers.proxyauthorization,
        },
      });

      let user = await updateUserOrCreate(ssoId, userData.data);
      let manager = await updateUserOrCreate(
        managerData.data.id,
        managerData.data
      );
      await UserManager.upsert({
        userId: user.id,
        managerId: manager.id,
        isActive: true,
      });

      let role = "Employee";
      if (user.department === "L&D") {
        role = "L&D";
      } else if (user.jobTitle.includes("Manager")) {
        role = "Manager";
      }

      const newToken = generateJWT(
        user.id as UUID,
        role,
        user.firstName,
        manager.id as UUID
      );

      return res.status(200).json({
        success: true,
        message: "User authorization successful",
        data: {
          token: newToken,
          user_role: role,
          user_name: userData.data.givenName,
        },
      });
    }
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default authorize;
