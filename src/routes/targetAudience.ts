import express from 'express'
import {Request, Response} from 'express'
import jwtVerification from '../middleware/jwtVerification';
import getTargetAudience from '../controllers/targetAudience/getTargetAudience';
import postTargetAudience from '../controllers/targetAudience/postTargetAudience';

const targetAudience = express.Router();


targetAudience.get('/',  jwtVerification, (req: Request, res: Response) => {
    getTargetAudience(req,res);
 });

targetAudience.post('/', jwtVerification, (req: Request, res: Response) => {
    postTargetAudience(req,res)
});


export default targetAudience;
