import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import TargetAudience from "../types/modelTypes/targetAudience";

TargetAudience.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: "TargetAudience",
        tableName: "targetAudience",
        underscored: true,
        freezeTableName: true,
    }
);

export default TargetAudience;
