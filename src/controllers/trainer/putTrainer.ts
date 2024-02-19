import { Request, Response } from 'express';
import Trainer from '../../types/modelTypes/trainer';

const putTrainer = async (req: Request, res: Response) => {

  //JWT verification - only L&D can edit trainer
  const { id, user_role } = res.locals.decodedToken;

  if (user_role !== "L&D") {
    return res.status(422).json({ success: "false", error: "Invalid user data" });
  }

  //Data from request parameter - id
  const trainerId: number = parseInt(req.params.id, 10);
  const updatedTrainerData: Partial<Trainer> = req.body;

  //Checking if trainer exists
  try {
    const existingTrainer = await Trainer.findByPk(trainerId);

    if (!existingTrainer) {
      return res.status(404).json({ success: "false", error: 'Trainer not found' });
    }

    // Updating the trainer's record
    await existingTrainer.update(updatedTrainerData);

    res.status(200).json({ success: "true", message: 'Trainer updated successfully', updatedTrainer: existingTrainer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: "false", error: 'Internal Server Error' });
  }
};

export default putTrainer;