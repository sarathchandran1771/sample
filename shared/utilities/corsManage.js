//../../../shared/utilities/corsManage
const express = require("express");
const cors = require('cors');
const corsManage = express.Router();


const corsOptions = {
    credentials: true,
    origin: '*',
    methods: 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
};

corsManage.use(cors(corsOptions));

module.exports = corsManage;

