const express = require('express')
const router = express.Router()

// import controller functions
const {
    getAllQuestionaries,
    getQuiz,
    createQuestionary,
    submitQuiz,
    deleteQuiz,
} = require('./controller')

router.route('/').get(getAllQuestionaries).post(createQuestionary)
router.route('/:id').get(getQuiz).post(submitQuiz).delete(deleteQuiz)

module.exports = router
