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
                questionaryId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Questionaries',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                type: {
                    allowNull: false,
                    isIn: ["text", "single", "multiple"],
                    type: Sequelize.STRING
                },
                question: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                response: {
                    allowNull: false,
                    type: Sequelize.STRING
                },
                answer: {
                    allowNull: false,
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
            }, {
                indexes: [
                    {
                        unique: true, fields: ['questionaryId', 'question']
                    },
                ]
            });
        await queryInterface.addConstraint('Tasks', {
            fields: ['questionaryId', 'question'],
            type: 'unique',
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Tasks');
    }
};