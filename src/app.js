const express = require('express');
const assignmentRoutes = require('./routes/assignment.routes');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/assignments', assignmentRoutes);

module.exports = app;
