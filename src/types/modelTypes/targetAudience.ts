import { UUID } from "crypto";
import { Model } from "sequelize";

class TargetAudience extends Model {
    public id?: number;
    public name!: string;
    public createdBy?: UUID;
    public isActive?: Boolean;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

export default TargetAudience;