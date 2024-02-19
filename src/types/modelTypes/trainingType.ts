import { UUID } from "crypto";
import { Model } from "sequelize";

class TrainingType extends Model {
    public id?: number;
    public trainingType!: string;
    public createdBy?: UUID;
    public isActive?: Boolean;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

export default TrainingType;