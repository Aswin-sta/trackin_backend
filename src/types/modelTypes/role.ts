import { Model } from "sequelize";

class Role extends Model {
  public id!: number;
  public role!: string;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt?: Date;
}
export default Role;
