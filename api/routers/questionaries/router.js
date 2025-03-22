const express = require('express')
const router = express.Router()

// import controller functions
const {
    getAllQuestionaries
} = require('./controller')

router.route('/').get(getAllQuestionaries)

module.exports = router
