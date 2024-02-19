//api to remove nomination(s) of an employee before his manager approves his request

import { Request, Response } from 'express';
import NominationRequest from '../../models/nominationRequest';

const deleteNominationRequests = async (req: Request, res: Response): Promise<Response> => {

    try {
        const nominations = req.body as { id: number }[]; //getting nomination id
        const { user_id } = res.locals.decodedToken; //getting user id from jwt token

        //check whether we got data from body or not
        if (!nominations || !Array.isArray(nominations)) { 
            return res.status(422).json({ error: 'Bad request' });
        }

        for (const nomination of nominations) {
            if (!nomination.id) {
                return res.status(422).json({ error: 'Invalid Request' });
            }

            // Check whether the nomination is already approved or not
            const isApproved = await NominationRequest.findOne({
                where: { id: nomination.id, status: 'Approved' },
            });

            //Inform employee nomination cannot be removed as the manager has already approved his request
            if (isApproved) {
                return res.status(422).json({ error: 'Nomination is already approved and cannot be removed' });
            }

            // Update only if the status is 'Pending' and self nominated
            await NominationRequest.update(
                { isActive: false, status: 'Removed', remarks: 'Removed By Employee' },
                { where: { id: nomination.id, createdBy:user_id } }
            );
        }

        return res.status(200).json({ success: 'true', message: 'Nomination(s) Removed' });
    } 
    
    catch (error: any) {
        return res.status(500).json({ success: 'false', error: 'Internal Server Error' });
    }
};

export default deleteNominationRequests;
