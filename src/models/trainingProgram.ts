import TrainingProgram from "../types/modelTypes/trainingProgram";
import sequelize from "../config/sequelize";
import { DataTypes } from "sequelize";
import TrainingType from "./trainingType";
import ProgramAudience from "./programAudience";
import ProgramTrainer from "./programTrainer";
import { FeedbackTemplate } from "./feedbackTemplate";

TrainingProgram.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trainingTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trainingMode: {
      type: DataTypes.ENUM("Online", "Offline"),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    durationPerSession: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    occuranceType: {
      type: DataTypes.ENUM("Once", "Daily", "Weekly", "Monthly"),
      allowNull: false,
    },
    occuranceInterval: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    feedback: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    feedbackTemplateId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM(
        "Upcoming",
        "Ongoing",
        "Completed",
        "Cancelled",
        "Postponed"
      ),
      allowNull: false,
      defaultValue: "Upcoming",
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW(),
    },
  },
  {
    sequelize,
    modelName: "TrainingProgram",
    tableName: "trainingProgram",
    underscored: true,
    freezeTableName: true,
  }
);

TrainingType.hasMany(TrainingProgram, { foreignKey: 'training_type_id' });
TrainingProgram.belongsTo(TrainingType, { foreignKey: 'training_type_id' });
TrainingProgram.belongsTo(FeedbackTemplate, {
  foreignKey: "feedbackTemplateId",
});
TrainingProgram.hasMany(ProgramAudience, { foreignKey: "trainingProgramId" });
TrainingProgram.hasMany(ProgramTrainer, { foreignKey: "trainingProgramId" });

export default TrainingProgram;
