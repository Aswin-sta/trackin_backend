import { UUID, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize";
import UserTraining from "../types/modelTypes/userTraining";
import TrainingProgram from "./trainingProgram";
import User from "./user";
import Attendance from "./attendance";
 
UserTraining.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    userId: {
      type: UUID,
      allowNull: false,
    },
    trainingProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completionStatus: {
      type: DataTypes.ENUM(
        "Enrolled",
        "Ongoing",
        "Hold",
        "Completed",
        "Dropout"
      ),
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
      allowNull: false,
      defaultValue: DataTypes.NOW(),
    },
  },
  {
    sequelize,
    modelName: "UserTraining",
    tableName: "userTraining",
    underscored: true,
    freezeTableName: true,
  }
);
 
UserTraining.belongsTo(TrainingProgram, { foreignKey: "trainingProgramId" });
TrainingProgram.hasMany(UserTraining, { foreignKey: "trainingProgramId" });
UserTraining.belongsTo(User, { foreignKey: "userId" });
User.hasMany(UserTraining, { foreignKey: "userId" });
UserTraining.hasOne(Attendance, { foreignKey: "userTrainingId" })
Attendance.belongsTo(UserTraining, { foreignKey: "userTrainingId" })
 
export default UserTraining;