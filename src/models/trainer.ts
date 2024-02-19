import Trainer from "../types/modelTypes/trainer";
import sequelize from "../config/sequelize.ts";
import { DataTypes } from "sequelize";

Trainer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        trainerType: {
            type: DataTypes.ENUM("Internal", "External"),
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expertiseIn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        facilitatedTrainings: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        certifications: {
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
            allowNull: false,
            defaultValue: DataTypes.NOW(),
        },
    },
    {
        sequelize,
        modelName: "Trainer",
        tableName: "trainer",
        underscored: true,
        freezeTableName: true,
    }
);

export default Trainer;
