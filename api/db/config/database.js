const Sequelize = require('sequelize');
const config = require('./development');
const models = require('../models')

const dbConfig = config.database

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    logging: dbConfig.logging,
});

module.exports = sequelize;