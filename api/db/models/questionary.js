'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Questionary extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Questionary.hasMany(models.Task, {
                foreignKey: 'questionary_id'
            })
        }
    }

    Questionary.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Questionary',
    });
    return Questionary;
};