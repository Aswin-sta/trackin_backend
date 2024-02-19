import sequelize from "../config/sequelize";
import { TrainingProgramFeedback } from "../types/modelTypes/trainingProgramFeedback";
import { DataTypes } from "sequelize";
import userTraining from "./userTraining";
import UserTraining from "./userTraining";

TrainingProgramFeedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    userTrainingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    feedback: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "TrainingProgramFeedback",
    tableName: "trainingProgramFeedback",
    underscored: true,
    freezeTableName: true,
  }
);

TrainingProgramFeedback.belongsTo(UserTraining, {
  foreignKey: "userTrainingId",
});

export default TrainingProgramFeedback;
