const express = require('express')
const router = express.Router()

// import controller functions
const {
    getAllQuestionaries,
    getQuiz,
    createQuestionary,
} = require('./controller')

router.route('/').get(getAllQuestionaries).post(createQuestionary)
router.route('/:id').get(getQuiz)

module.exports = router
