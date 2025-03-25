const express = require('express');
const cors = require('cors')

const app = express();

// import routers
const questionaries_router = require('./routers/questionaries/router')

// middleware
app.use(express.json());
app.use(cors());

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