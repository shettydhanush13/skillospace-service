const express = require('express');

const app = express();
const routes = require('./routes');
const { middleware, errorHandler } = require('./core');
const { postgres } = require("./db")

middleware(app)
postgres.test();

app.use('/api', routes);

app.all('*', (req, res) => {
    return errorHandler(
        { message: 'Access denied.', statusCode: 403 },
        req,
        res
    );
});

module.exports = app;