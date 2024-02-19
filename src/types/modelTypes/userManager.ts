  import { UUID } from "crypto";
  import { Model } from "sequelize";
  
  class UserManager extends Model {
    public id!: number; 
    public userId!: UUID; 
    public managerId!: UUID; 
    public isActive!: boolean; 
    public createdAt!: Date; 
    public updatedAt?: Date;
  }
  
  export default UserManager