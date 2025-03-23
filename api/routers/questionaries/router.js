const express = require('express')
const router = express.Router()

// import controller functions
const {
    getAllQuestionaries,
    createQuestionary,
} = require('./controller')

router.route('/').get(getAllQuestionaries).post(createQuestionary)

module.exports = router
