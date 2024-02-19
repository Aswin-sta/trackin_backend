import { Model } from "sequelize";

class ProgramTrainer extends Model {
    public id?: number;
    public trainingProgramId!: number;
    public trainerId!: number;
    public isActive?: Boolean;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

export default ProgramTrainer;