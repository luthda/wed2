"use strict";

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController.js');

router.get('/',  notificationController.index);

router.get('/Note/new', notificationController.newNote);

module.exports = router;