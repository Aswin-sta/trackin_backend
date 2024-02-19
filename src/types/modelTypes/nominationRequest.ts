import { UUID } from 'crypto'
import { Model } from 'sequelize'

class NominationRequest extends Model {
    public id?: Number
    public userId!: UUID
    public trainingProgramId!: Number
    public assignerId!: UUID;
    public status!: 'Pending' | 'Approved' | 'Rejected' | 'Removed';
    public remarks?: string;
    public createdBy!: UUID
    public updatedBy?: UUID;
    public isActive!: boolean
    public readonly createdAt?: Date
    public readonly updatedAt?: Date
}

export default NominationRequest
