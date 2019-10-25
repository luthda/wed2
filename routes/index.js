"use strict";

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController.js');

router.get('/',  notificationController.index);
router.get('/notes',  notificationController.notes);
router.post('/Note/new', notificationController.newNote);
router.post('/Note/saveNew', notificationController.addNote);
router.post('/Note/edit', notificationController.editNote);
router.post('/Note/saveEdited', notificationController.editedNote);


module.exports = router;