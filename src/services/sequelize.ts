import sequelize from   '../config/sequelize.ts';
const  sequelizeSync= async ()=>{
    await sequelize
        .sync({ force:false}) //set force to true to drop and recreate tables on every application start
        .then(() => {
          console.log("Database Synced");
        })
        .catch((error) => {
          console.error("Error syncing database:", error);
        });
    
      }

      export default sequelizeSync