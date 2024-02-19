import { UUID } from "crypto";
import fs from "fs";
import jwt from "jsonwebtoken";

const privateKeyPath = "src/authorization/private.pem";
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

const generateJWT = (
  user_id: UUID,
  user_role: string,
  user_name: string,
  manager_id: UUID
) => {
  return jwt.sign(
    {
      user_id: user_id,
      user_role: user_role,
      user_name: user_name,
      manager_id: manager_id,
      iat: Math.floor(Date.now() / 1000) - 30,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    privateKey,
    { algorithm: "RS256" }
  );
};

export default generateJWT;
