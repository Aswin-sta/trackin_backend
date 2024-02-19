import { UUID } from "crypto";
import { Model } from "sequelize";

class TrainingProgramFeedback extends Model {
  public id!: number;
  public userTrainingId!: number;
  public rating!: number;
  public feedback!: Record<string, any>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export { TrainingProgramFeedback };
