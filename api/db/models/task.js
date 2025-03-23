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
                    foreignKey: 'questionaryId',
                    as: 'questionaryId'
                })
        }
    }

    Task.init({
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            isIn: ["text", "single", "multiple"],
        },
        questionaryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        response: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Task',
        indexes: [
            {
                unique: true, fields: ['questionaryId', 'question']
            },
        ]
    });
    return Task;
};