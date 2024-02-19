import { DataTypes, UUID, Sequelize } from "sequelize";
import sequelize from "../config/sequelize";
import UserManager from "../types/modelTypes/userManager";

UserManager.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: UUID,
      allowNull: false,
    },
    managerId: {
      type: UUID,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
    modelName: "UserManager",
    tableName: "userManager",
    underscored: true,
    freezeTableName: true,
  }
);

export default UserManager;
