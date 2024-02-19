import express, { Request, Response } from 'express';
import Trainer from '../../types/modelTypes/trainer';

const patchTrainer = async (req: Request, res: Response) => {

  //JWT Verification - only L&D can delete(soft-delete)
  const { id, user_role } = res.locals.decodedToken;

  if (user_role !== "L&D") {
    return res.status(422).json({ success: "false", error: "Invalid user data" });
  }

  //Data from request parameter - id
  const trainerId: number = parseInt(req.params.id, 10);

  //Checking if trainer exists
  try {
    const existingTrainer = await Trainer.findByPk(trainerId);

    if (!existingTrainer) {
      return res.status(404).json({ success: "false", error: 'Trainer not found' });
    }

    //Updating to false to perform soft-deletion
    await existingTrainer.update({ is_active: false });


    res.status(200).json({ success: "true", message: 'Trainer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: "false", error: 'Internal Server Error' });
  }
};

export default patchTrainer;