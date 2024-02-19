import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import ProgramTrainer from "../types/modelTypes/programTrainer";
import Trainer from "./trainer";

ProgramTrainer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    trainingProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trainerId: {
      type: DataTypes.INTEGER,
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
    modelName: "ProgramTrainer",
    tableName: "programTrainer",
    underscored: true,
    freezeTableName: true,
  }
);

ProgramTrainer.belongsTo(Trainer, { foreignKey: "trainerId" });

export default ProgramTrainer;
