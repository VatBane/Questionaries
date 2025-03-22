'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Task.belongsTo(models.Questionary,
                {
                    foreignKey: 'questionary_id',
                })
        }
    }

    Task.init({
        type: DataTypes.STRING,
        question: DataTypes.STRING,
        responses: DataTypes.STRING,
        answer: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Task',
    });
    return Task;
};