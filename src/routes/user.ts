import express, { Request, Response } from "express";

import jwtVerification from "../middleware/jwtVerification";
import getAllUsers from "../controllers/user/getAllUsers";
import getCurrentUser from "../controllers/user/getUSer";
import getUserById from "../controllers/user/getUserById";

const userRouter = express.Router();

userRouter.get("/users", jwtVerification, getAllUsers);

userRouter.get("/users/:id", jwtVerification, getUserById);

userRouter.get(
  "/profile",
  jwtVerification,
  async (req: Request, res: Response) => {
    getCurrentUser(req, res);
  }
);

export default userRouter;
