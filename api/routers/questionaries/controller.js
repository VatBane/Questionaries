const Sequelize = require('sequelize');
const sequelize = require('../../db/config/database');
const Questionary = require('../../db/models/Questionary')(sequelize, Sequelize.DataTypes);
const Task = require('../../db/models/Task')(sequelize, Sequelize.DataTypes);

const QuestionaryInput = require('./models')
const {ValidationError} = require("sequelize");
const InputValidationError = require("../../errors/validation");

const getAllQuestionaries = async (req, res) => {
    let quests = await Questionary.findAll();
    return res.status(200).json(quests)
}

const createQuestionary = async (req, res) => {
    const transaction = await sequelize.transaction()

    try {
        // validate input
        let questionary_in = new QuestionaryInput(req.body);

        // create db instances
        let questionary = await Questionary.create(questionary_in,
            {transaction: transaction});

        await questionary.save({transaction: transaction})

        let tasks = questionary_in.tasks.map(async task => {
            return await Task.create({
                questionaryId: questionary.id,
                question: task.question,
                response: task.response,
                answer: task.answer,
                type: task.type,}
            )
        })

        // insert models to database

        await transaction.commit()
        // apply all changes and send response
        res.status(200).json({})
    } catch (error) {
        if (error instanceof InputValidationError) {
            res.status(400).json({ error: error.message });
        }
        else if (error instanceof ValidationError) {
            res.status(409).json({ error: error.errors[0].message });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = {
    getAllQuestionaries,
    createQuestionary,
}