import express, { urlencoded, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelizeSync from "./services/sequelize";
import userRouter from "./routes/user";
import nominationRouter from "./routes/nominationRequests";
import { feedbackTemplateRouter } from "./routes/feedbackTemplate";
import trainingProgram from "./routes/trainingProgram";
import trainingType from "./routes/trainingType";
import userTrainingRouter from "./routes/userTraining";
import trainer from "./routes/trainerRouter";
import targetAudience from "./routes/targetAudience";
import authorize from "./authorization/authorization";
import dashboardRouter from "./routes/dashboard";

import attendanceRouter from "./routes/attendance";

import { feedbackRouter } from "./routes/FeedbackRouter";
import getUnMarkedAttendance from "./controllers/attendance/getUnMarkedAttendance";
import getMarkedAttendance from "./controllers/attendance/getMarkedAttendance";
import refreshToken from "./authorization/refreshToken";

dotenv.config({ path: ".env" });
const app = express();
const PORT = process.env.PORT;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: "true", message: "Hello from  server!" });
});

app.use("/user", userRouter);
app.use("/nomination", nominationRouter);
app.use("/user-training", userTrainingRouter);
app.use(feedbackTemplateRouter);
app.use(trainingProgram);
app.use(trainingType);
app.use("/trainers", trainer);
app.use("/target-audiences", targetAudience);
app.use("/dashboard", dashboardRouter);
app.use("/auth", authorize);
app.use(attendanceRouter);
app.use("/feedback", feedbackRouter);
app.get("/refresh/token", refreshToken);

sequelizeSync();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
