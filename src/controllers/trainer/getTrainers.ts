import express, { Request, Response } from 'express';
import Trainer from '../../types/modelTypes/trainer';

const getTrainers = async (req: Request, res: Response) => {

  //JWT Verification - All users can view trainers
  const { user_id, user_role } = res.locals.decodedToken;
  console.log(user_role)

  if (user_role !== "L&D") {
    console.log("Invalid user data")
    return res.status(422).json({ success: "false", error: "Invalid user data" });
  }

  try {
    const param: string | undefined = req.query.category as string | undefined;

    let options = {};
    if (param) {
      options = { trainerType: param };
    }

    //Getting Trainer details 
    const trainers = await Trainer.findAll({ where: options });

    return res.status(200).json({ success: "true", data: trainers, message: "Trainer data fetched successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: "false", error: 'Internal Server Error' });
  }
};

export default getTrainers;