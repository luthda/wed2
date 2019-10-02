"use strict";

const notificationService = require('../services/notificationService');
const qs = require('qs');

function index(req, res)
{
    res.render('layout', { title: 'Notification App' });
}

module.exports = {index};