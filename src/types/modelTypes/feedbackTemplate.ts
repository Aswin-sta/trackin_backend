import { UUID } from "crypto";
import { Model } from "sequelize";

class FeedbackTemplate extends Model {
  public id!: number;
  public name!: string;
  public template!: Record<string, any>;
  public createdBy!: UUID;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export { FeedbackTemplate };
