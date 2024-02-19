import { UUID } from 'crypto';
import { Model } from 'sequelize';

class Trainer extends Model {
    public id?: number;
    public trainerType!: 'Internal' | 'External';
    public fullname!: string;
    public email!: string;
    public contactNumber!: string;
    public experience!: number;
    public expertiseIn!: string;
    public facilitatedTrainings!: string;
    public certifications!: string;
    public createdBy!: UUID;
    public isActive?: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;
}

export default Trainer;