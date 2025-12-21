const express = require('express');
const assignmentRoutes = require('./routes/assignment.routes');

const app = express();
app.use(express.json());

app.use('/assignments', assignmentRoutes);

module.exports = app;
