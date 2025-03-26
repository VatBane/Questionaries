'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Submitions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Submission.belongsTo(models.Questionary,
                {
                    foreignKey: 'questionaryId'
                })
        }
    }

    Submitions.init({
        questionaryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
            min: 0,
            max: 100
        },
        tookTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            min: 0
        }
    }, {
        sequelize,
        modelName: 'Submitions',
    });
    return Submitions;
};