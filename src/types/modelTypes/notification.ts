import { DataTypes, Model } from "sequelize";
import { UUID } from "crypto";

class Notification extends Model {
  public id!: number;
  public userId!: UUID;
  public message!: string;
  public read!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default Notification;
