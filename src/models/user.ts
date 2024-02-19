import User from "../types/modelTypes/user";
import sequelize from "../config/sequelize";
import { DataTypes, Sequelize, UUIDV4 } from "sequelize";
import UserRole from "./userRole";
import Role from "./role";
import NominationRequest from "./nominationRequest";

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    ssoId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
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
    modelName: "User",
    tableName: "user",
    underscored: true,
    freezeTableName: true,
  }
);

UserRole.belongsTo(User, { foreignKey: "userId" });
User.hasOne(UserRole, { foreignKey: "userId" });

Role.hasMany(UserRole, { foreignKey: "role_id" });
UserRole.belongsTo(Role, { foreignKey: "roleId" });

export default User;
