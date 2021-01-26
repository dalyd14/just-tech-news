const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User Model
class User extends Model {}

// define table columns and config
User.init(
    {
        //Table col defs go here
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            // sql NOT NULL
            allowNull: false,
            // this is primary key
            primaryKey: true,
            //auto increment
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // if allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        //table config opt go here

        //pass in ourimported sequelize connection (the direct connection to our db)
        sequelize,
        // dont autmatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // dont pluraize name of database table
        freezeTableName: true,
        // use underscore instead of camel-casing
        underscored: true,
        //make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;