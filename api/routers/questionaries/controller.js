const Questionary = require('../../db/models/Questionary');

const getAllQuestionaries = async (req, res) => {

    return res.status(200).json([])
}

module.exports = {
    getAllQuestionaries,
}