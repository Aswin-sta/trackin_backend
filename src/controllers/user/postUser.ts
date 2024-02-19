import { NextFunction, Request, Response } from "express";
import axios from "axios";
import User from "../../models/user";

let graphMeEndpoint: string =
  "https://graph.microsoft.com/v1.0/me?$select=id,department,employeeId,givenName,surName,userPrincipalName,jobTitle";

const postUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Token not provided" });
    }

    const response = await axios.get(graphMeEndpoint, {
      headers: {
        Authorization: token,
      },
    });
    let user = {
      ssoId: response.data.id,
      employeeId: response.data.employeeId || Math.floor(Math.random() * 1000),
      email: response.data.userPrincipalName,
      firstName: response.data.givenName,
      lastName: response.data.surName,
      jobTitle: response.data.jobTitle,
      department: response.data.department,
      isActive: true,
    };
    try {
      await User.create(user);

      return res
        .status(201)
        .json({ success: true, message: "user added successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ valid: false, error: "Invalid token" });
  }
};

export default postUser;
