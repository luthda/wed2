"use strict";

const notificationService = require('../services/notificationService');
const qs = require('qs');

module.exports.index = function(req, res)
{
    res.render('newNote');
};

module.exports.newNote = function(req, res)
{
    res.render('newNote', { });
};
