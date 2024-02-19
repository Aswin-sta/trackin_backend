import { UUID } from "crypto";
import { Model } from "sequelize";

class TrainingProgram extends Model {
  [x: string]: any;
  public id?: number;
  public title!: string;
  public trainingTypeId!: number;
  public description!: string;
  public trainingMode!: "Online" | "Offline";
  public startDate!: Date;
  public endDate!: Date;
  public duration!: number;
  public durationPerSession!: number;
  public availableSeats!: number;
  public occuranceType!: "Once" | "Daily" | "Weekly" | "Monthly";
  public occuranceInterval!: number;
  public feedback!: boolean;
  public feedbackTemplateId!: number;
  public status!:
    | "Upcoming"
    | "Ongoing"
    | "Completed"
    | "Cancelled"
    | "Postponed";
  public createdBy!: UUID;
  public isActive?: Boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  ProgramTrainers: any;

  static associate(models: any) {
    this.hasOne(models.FeedbackTemplate, {
      foreignKey: "id",
    });
  }
}

export default TrainingProgram;
