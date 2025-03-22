const Sequelize = require('sequelize');
const sequelize = require('../../db/config/database');
const Questionary = require('../../db/models/Questionary')(sequelize, Sequelize.DataTypes);

const getAllQuestionaries = async (req, res) => {
    let quests = await Questionary.findAll();
    return res.status(200).json(quests)
}

module.exports = {
    getAllQuestionaries,
}