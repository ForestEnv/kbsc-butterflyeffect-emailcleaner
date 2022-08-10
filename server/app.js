require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
//const passport = require('passport');

const models = require('./models');
//const passportConfig = require('./passport');
//const apiRouter = require('./routes');

const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

models.sequelize.sync().then(() => {
    DEV_PORT = process.env.PORT;
    app.listen(DEV_PORT, () => {
        console.log(`SERVER RUN: ${DEV_PORT}`)
    });
});

//app.use(passport.initialize());
//passportConfig();

//app.use('/api',apiRouter);
module.exports = app;