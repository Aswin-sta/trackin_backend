import express from 'express'
import { Request,Response} from 'express'
import getUserTrainings from '../controllers/userTrainings/getUserTrainings'
import jwtVerification from '../middleware/jwtVerification'

const userTrainingRouter=express.Router()

userTrainingRouter.get('/get-user-trainings',jwtVerification, async(req:Request,res:Response)=>{
    getUserTrainings(req,res)
})

export default userTrainingRouter