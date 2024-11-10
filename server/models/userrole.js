const { DataTypes } = require('sequelize');
const db = require("./db");

const UserRoles = db.define('user_roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    assigned_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    
    },
   
});

module.exports = UserRoles;