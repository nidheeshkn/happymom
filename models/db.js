const Seq= require("sequelize");
const sequelize = new Seq('happymom', 'happymom', 'happymom@sls', {
    host: 'localhost',
    dialect:'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });
module.exports=sequelize;