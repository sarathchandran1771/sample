//../../../shared/utilities/corsManage
const express = require("express");
const cors = require('cors');
const corsManage = express.Router();

// Allow all origins
corsManage.use(cors({
    credentials: true,
    origin: '*',
    methods: 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
}));

module.exports = corsManage;
