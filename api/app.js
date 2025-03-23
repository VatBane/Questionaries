const express = require('express');
const app = express();

// import routers
const questionaries_router = require('./routers/questionaries/router')

// middleware
app.use(express.json());

app.use('/api/v1/questionaries', questionaries_router)


const port = process.env.PORT || 8080;

const start = async () => {
    try {
        app.listen(port, console.log("Server successfully started..."));
    } catch (error) {
        console.log(error);
    }
}

start()