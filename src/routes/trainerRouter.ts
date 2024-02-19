import express from 'express'
import {Request, Response} from 'express'
import Router from "express";
import Trainer from '../models/trainer';
import jwtVerification from '../middleware/jwtVerification';
import getTrainers from '../controllers/trainer/getTrainers';
import postTrainer from '../controllers/trainer/postTrainer';
import patchTrainer from '../controllers/trainer/patchTrainer';
import putTrainer from '../controllers/trainer/putTrainer';

 

const trainer = express.Router();

trainer.post('/postTrainer', jwtVerification, (req:Request,res:Response)=>{
   postTrainer(req,res);
});

trainer.put("/:id", jwtVerification,(req: Request, res: Response) => {
   putTrainer(req, res);
});

trainer.get('/', jwtVerification, async (req: Request, res: Response) => {
   getTrainers(req,res);
})
trainer.patch('/:id', jwtVerification,(req:Request,res:Response)=>{
   patchTrainer(req,res);
});
export default trainer;
