'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Submitions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            questionaryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Questionaries',
                    key: 'id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }
            },
            rate: {
                type: Sequelize.INTEGER,
                allowNull: false,
                min: 0,
                max: 100
            },
            tookTime: {
                type: Sequelize.INTEGER,
                allowNull: false,
                min: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Submitions');
    }
};