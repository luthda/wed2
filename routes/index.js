"use strict";

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController.js');

router.get('/',  notificationController.index);
router.get('/notes',  notificationController.index);
router.get('/Note/new', notificationController.newNote);
router.post('/notes', notificationController.addNote);
router.post('/Note/edit', notificationController.editNote);
router.post('/Note/edited', notificationController.editedNote);


module.exports = router;