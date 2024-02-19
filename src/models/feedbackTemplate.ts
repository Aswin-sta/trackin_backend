import Sequelize, { DataTypes } from "sequelize";
import { FeedbackTemplate } from "../types/modelTypes/feedbackTemplate";
import sequelize from "../config/sequelize";

FeedbackTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    template: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.UUID,
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
    modelName: "FeedbackTemplate",
    tableName: "feedbackTemplate",
    underscored: true,
    freezeTableName: true,
  }
);

export { FeedbackTemplate };
