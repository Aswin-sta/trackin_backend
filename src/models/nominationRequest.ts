import { DataTypes, Sequelize } from "sequelize";
import NominationRequest from "../types/modelTypes/nominationRequest";
import sequelize from "../config/sequelize";
import User from "./user";
import TrainingProgram from "./trainingProgram";

NominationRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    trainingProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assignerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Removed by Employee", "Manager Approval Pending", "Approved by Manager", "Rejected by Manager", "Approved by L&D", "Rejected by L&D"),
      allowNull: false,
    },
    remarks: {
      type: DataTypes.TEXT,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.UUID,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    modelName: "nominationRequest",
    tableName: "nominationRequest",
    underscored: true,
    freezeTableName: true,
  }
);

NominationRequest.belongsTo(User, { foreignKey: "assignerId", as: "approver" });
NominationRequest.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(NominationRequest, { foreignKey: "assignerId" });
NominationRequest.belongsTo(TrainingProgram, {
  foreignKey: "trainingProgramId",
});
TrainingProgram.hasMany(NominationRequest, { foreignKey: "trainingProgramId" });
export default NominationRequest;

