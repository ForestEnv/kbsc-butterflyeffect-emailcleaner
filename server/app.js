
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

const port =8000;
const apiRouter = require('./routes');
const passportConfig = require('./passport');

const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use('/api',apiRouter);

module.exports = app;