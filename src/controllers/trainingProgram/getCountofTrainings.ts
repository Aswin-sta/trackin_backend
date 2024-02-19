import { Request, Response } from "express";
import TrainingProgram from "../../models/trainingProgram";
import TrainingType from "../../models/trainingType";

interface TrainingTypeWithProgramCount {
    id: number;
    trainingType: string;
    programCount: number;
}

const getCountOfTrainings = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user_role } = res.locals.decodedToken;
        if (user_role !== "L&D") {
            console.error("Invalid Authorization");
            return res.status(401).json({
                success: false,
                error: "Invalid Authorization",
            });
        }

        const result = await getTrainingProgramCountByType();

        return res.status(200).json({
            success: true,
            message: "Fetched training program count successfully",
            data: result
        });
    } catch (error: any) {
        console.error("Error fetching training program count:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
}

const getTrainingProgramCountByType = async (): Promise<TrainingTypeWithProgramCount[]> => {
    const result = await TrainingType.findAll({
        attributes: ['id', 'trainingType'],
        include: {
            model: TrainingProgram,
            attributes: [],
            required: true,
        },
        group: ['TrainingType.id']
    });

    const resultWithTotal: TrainingTypeWithProgramCount[] = await Promise.all(result.map(async (item) => {
        const programCount = await TrainingProgram.count({
            where: { trainingTypeId: item.id }
        });

        return {
            id: item.id ?? 0,
            trainingType: item.trainingType,
            programCount: programCount ?? 0,
        };
    }));

    const totalPrograms = await TrainingProgram.count();
    resultWithTotal.push({ id: 0, trainingType: 'Total', programCount: totalPrograms });

    resultWithTotal.sort((a, b) => a.id - b.id);

    return resultWithTotal;
};

export default getCountOfTrainings;
