import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize";
import UserRole from "../types/modelTypes/userRole";

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
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
      allowNull: false,
      defaultValue: DataTypes.NOW(),
    },
  },
  {
    sequelize,
    modelName: "UserRole",
    tableName: "userRole",
    underscored: true,
    freezeTableName: true,
  }
);

export default UserRole;
