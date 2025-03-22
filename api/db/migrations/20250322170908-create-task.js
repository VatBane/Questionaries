'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            questionary_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Questionaries',
                    key: 'id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }
            },
            type: {
                type: Sequelize.STRING
            },
            question: {
                type: Sequelize.STRING
            },
            responses: {
                type: Sequelize.STRING
            },
            answer: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Tasks');
    }
};