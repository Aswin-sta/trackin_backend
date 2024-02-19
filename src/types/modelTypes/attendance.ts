import { UUID } from "crypto";
import { Model } from "sequelize";

class Attendance extends Model {
  public id?: number;
  public userTrainingId!: number;
  public isPresent!: boolean;
  public date!: Date;
  public hoursAttended!: number;
  public createdBy!: UUID;
  public updatedBy?: UUID;
  public createdAt?: Date;
  public updatedAt?: Date;
}
export default Attendance;
