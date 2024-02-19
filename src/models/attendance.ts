import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import Attendance from "../types/modelTypes/attendance";
import UserTraining from "./userTraining";

Attendance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userTrainingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPresent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hoursAttended: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
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
    tableName: "attendance",
    modelName: "Attendance",
    underscored: true,
    freezeTableName: true,
  }
);

export default Attendance;
