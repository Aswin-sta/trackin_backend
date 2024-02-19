//api to get the details users enrolled for training programs

import { Request, Response } from 'express';
import User from '../../models/user';
import UserTraining from '../../models/userTraining';
import TrainingProgram from '../../models/trainingProgram';

const getUserTrainings = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { user_id, user_role } = res.locals.decodedToken; //get user id and role from jwt token

        //check whether data is received from token or not
        if (!user_id || !user_role) {
            return res.status(422).json({ success: 'false', message: "Bad Request" });
        }

        //get enrolled training program details 
        if (user_role === "Employee" || user_role === "Manager") {
            const trainingDetails = await UserTraining.findAll({ attributes: ['trainingProgramId', 'completionStatus'], where: { userId: user_id } });
            
            // To get training program id from trainingDetails
            const trainingProgramIds = trainingDetails.map(detail => detail.trainingProgramId);
            
            // To get training program name using training program id
            const trainingNames = await TrainingProgram.findAll({ attributes: ['id', 'title'], where: { id: trainingProgramIds } });
            
            // To return training program name along with other details
            const trainingDetailsWithNames = trainingDetails.map(detail => {
                const associatedTraining = trainingNames.find(name => name.id === detail.trainingProgramId);
                return {
                    trainingProgramId: detail.trainingProgramId,
                    trainingName: associatedTraining ? associatedTraining.title : 'Unknown Training',
                    completionStatus: detail.completionStatus,
                };
            });
            return res.status(200).json({ success: 'true', data: trainingDetailsWithNames });
        } 
        
        //to get training program and participants details
        else if (user_role === "L&D") {
            const trainingDetails = await UserTraining.findAll();
            
            //To get userId from userTraining table
            const userIds = trainingDetails.map(detail => detail.userId);
            const userDetails = await User.findAll({ attributes: ['id', 'firstName', 'lastName', 'department'], where: { id: userIds } });
            
            //To get trainingProgramId from userTraining table
            const trainingProgramIds = trainingDetails.map(detail => detail.trainingProgramId);
            const trainingNames = await TrainingProgram.findAll({ attributes: ['id', 'title'], where: { id: trainingProgramIds } });
            
            //To return user details along with training details
            const trainingDetailsWithNames = trainingDetails.map(detail => {
                const associatedTraining = trainingNames.find(name => name.id === detail.trainingProgramId);
                const associatedUser = userDetails.find(user => user.id === detail.userId);
                return {
                    trainingProgramId: detail.trainingProgramId,
                    trainingName: associatedTraining ? associatedTraining.title : 'Unknown Training',
                    userId: detail.userId,
                    firstName: associatedUser ? associatedUser.firstName : 'Unknown First Name',
                    lastName: associatedUser ? associatedUser.lastName : 'Unknown Last Name',
                    department: associatedUser ? associatedUser.department : 'Unknown Department',
                    completionStatus: detail.completionStatus,
                    createdAt: detail.createdAt,
                    updatedAt: detail.updatedAt
                };
            });
            return res.status(200).json({ success: 'true', data: trainingDetailsWithNames });
        } 
        
        else {
            return res.status(403).json({ success: 'false', error: 'Access Denied' });
        }
    } 
    
    catch (error: any) {
        console.error('Error:', error);
        return res.status(500).json({ success: 'false', error: 'Internal Server Error' });
    }
};

export default getUserTrainings;
