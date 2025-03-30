const Sequelize = require('sequelize');
const sequelize = require('../../db/config/database');
const Questionary = require('../../db/models/Questionary')(sequelize, Sequelize.DataTypes);
const Task = require('../../db/models/Task')(sequelize, Sequelize.DataTypes);
const models = require('../../db/models/index')

const {QuestionaryInput, QuestionaryResponse} = require('./models')
const {ValidationError} = require("sequelize");
const InputValidationError = require("../../errors/validation");
const {calculateSubmitionRate} = require("./utils");

const getAllQuestionaries = async (req, res) => {
    let quests = await models.Questionary.findAll({
        attributes: ['id', 'name', 'description',
            [sequelize.fn('COUNT', sequelize.col('tasks.id')), 'taskCount']],
        include: [
            {
                model: models.Task,
                as: 'tasks', // Make sure this matches your association alias
                attributes: [],
                required: false // Use LEFT JOIN to include questionaries with zero tasks
            }
        ],
        group: ['Questionary.id', 'Questionary.name', 'Questionary.description'],
    });
    return res.status(200).json(quests)
}


const getQuiz = async (req, res) => {
    let quest = await models.Questionary.findOne({
        attributes: ['id', 'name', 'description'],
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: models.Task,
                as: 'tasks',
            }
        ],
    })
    if (quest === null || quest === undefined) {
        return res.status(404).json({"message": "Questionary not found."})
    }

    const response = new QuestionaryResponse(quest)
    response.setTasks(quest.tasks)

    return res.status(200).json(response)
}


const createQuestionary = async (req, res) => {
    const transaction = await sequelize.transaction()

    try {
        // validate input
        let questionary_in = new QuestionaryInput(req.body);

        // create db instances
        let questionary = await Questionary.create(questionary_in,
            {transaction: transaction});

        let tasks = await Promise.all(questionary_in.tasks.map(async task => {
            return await Task.create({
                    questionaryId: questionary.id,
                    question: task.question,
                    response: task.response,
                    answer: task.answer,
                    type: task.type,
                },
                {transaction: transaction}
            )
        }))

        let response = new QuestionaryResponse(questionary)
        response.setTasks(tasks)

        await transaction.commit()
        // apply all changes and send response
        res.status(200).json(response)
    } catch (error) {
        if (error instanceof InputValidationError) {
            res.status(400).json({error: error.message});
        } else if (error instanceof ValidationError) {
            res.status(409).json({error: error.errors[0].message});
        } else {
            res.status(400).json({error: error.message});
        }
    }
}


const submitQuiz = async (req, res) => {
    const transaction = await sequelize.transaction()

    try {
        const answers = req.body.answers
        const correctAnswers = await Task.findAll({
            attributes: ['id', 'answer', 'type'],
            where: {"questionaryId": req.params.id}
        })
        const rate = Math.floor(calculateSubmitionRate(answers, correctAnswers))

        console.log(`time took:`)
        console.log(req.body)
        await models.Submition.create({
            questionaryId: req.params.id,
            rate: rate,
            tookTime: Math.floor(req.body.tookTime),
        }, {transaction: transaction})

        await transaction.commit()
        return res.status(200).json({rate: rate})
    } catch (error) {
        console.log(error)
        res.status(400).json({error});
    }
}


const deleteQuiz = async (req, res) => {
    const transaction = await sequelize.transaction()
    try {
        await Questionary.destroy({
            where: {id: req.params.id},
        })
        await transaction.commit()
    } catch (error) {
        res.status(500).json({error: error.message});
    }

}


module.exports = {
    getAllQuestionaries,
    getQuiz,
    createQuestionary,
    submitQuiz,
    deleteQuiz
}