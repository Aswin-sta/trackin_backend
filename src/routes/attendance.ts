import express from "express";
import { Request, Response } from "express";
import getAttendance from "../controllers/attendance/getAttendance";
import postAttendance from "../controllers/attendance/postAttendance";
import getParticipants from "../controllers/attendance/getParticipant";
import jwtVerification from "../middleware/jwtVerification";
import getUnMarkedAttendance from "../controllers/attendance/getUnMarkedAttendance";
import getMarkedAttendance from "../controllers/attendance/getMarkedAttendance";

const attendanceRouter = express.Router();

attendanceRouter.get("/view-attendance", (req: Request, res: Response) => {
  getAttendance(req, res);
});

attendanceRouter.post(
  "/add-attendance",
  jwtVerification,
  (req: Request, res: Response) => {
    postAttendance(req, res);
  }
);

attendanceRouter.get("/users-enrolled", async (req: Request, res: Response) => {
  getParticipants(req, res);
});

attendanceRouter.get("/attendance-unmarked", getUnMarkedAttendance);
attendanceRouter.get("/attendance-marked", getMarkedAttendance);

export default attendanceRouter;
