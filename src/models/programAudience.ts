import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import ProgramAudience from "../types/modelTypes/programAudience";
import TargetAudience from "./targetAudience";

ProgramAudience.init(
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
        audienceId: {
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
        modelName: "ProgramAudience",
        tableName: "programAudience",
        underscored: true,
        freezeTableName: true,
    }
);

ProgramAudience.belongsTo(TargetAudience, { foreignKey: "audienceId" });

export default ProgramAudience;
