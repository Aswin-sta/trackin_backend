import { UUID } from "crypto";
import { Model } from "sequelize";

class UserRole extends Model {
  public id!: number;
  public roleId!: number;
  public userId!: UUID;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default UserRole;
