"use strict";

const notificationService = require('../services/notificationService');
const qs = require('qs');

module.exports.index = function (req, res) {
    notificationService.all(function (err, notes) {
       res.render('overview', {'notes':notes});
    });
};

module.exports.newNote = function (req, res) {
    res.render('newNote', {});
};

module.exports.addNote = function (req, res) {
    notificationService.add(req.body, function (err, note) {
        res.render('newNote', {});
    });
};
