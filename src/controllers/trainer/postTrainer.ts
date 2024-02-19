import Trainer from '../../models/trainer';
import { Request, Response } from "express";

const postTrainer = async (req: Request, res: Response) => {

  //JWT Verification - only L&D can add trainer
  const { user_id, user_role } = res.locals.decodedToken;

  if (user_role !== "L&D") {
    return res.status(422).json({ success: "false", error: "Invalid user data" });
  }

  //Data from request body
  const {
    trainerType,
    fullname,
    email,
    contactNumber,
    experience,
    expertiseIn,
    facilitatedTrainings,
    certifications,

  } = req.body;

  //Checking for undefined fields
  try {
    if (
      !trainerType ||
      !fullname ||
      !email ||
      !contactNumber ||
      !experience ||
      !expertiseIn ||
      !facilitatedTrainings ||
      !certifications

    ) {
      return res.status(400).json({ success: "false", error: "No fields should be null" });
    }

    //Checking if the trainer exists
    const existingTrainer = await Trainer.findOne({ where: { email } });
    if (existingTrainer) {
      return res.status(409).json({ success: "false", error: "Trainer exists" });
    }

    //Creating a new trainer record
    const newTrainer = await Trainer.create({
      trainerType,
      fullname,
      email,
      contactNumber,
      experience,
      expertiseIn,
      facilitatedTrainings,
      certifications,
      createdBy: user_id,
    });

    res.status(201).json({
      success: "true",
      registration_id: `Registration of User ${newTrainer.id} completed`,
    });
  } catch (error) {
    console.error("Error in adding trainer:", error);
    res.status(500).json({ success: "false", error: "Internal Server Error" });
  }
};

export default postTrainer;
