"use strict";

const notificationService = require('../services/notificationService');
const config = require('../data/config');
const qs = require('qs');

module.exports.index = function (req, res) {
    notificationService.all(function (err, notes) {
       res.render('overview', {'notes':notes, 'config':config});
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

module.exports.editNote = function (req, res) {
    notificationService.get(req.body.id, function (err, note) {
        res.render('editNote', {'note': note});
    });
};

module.exports.editedNote = function (req, res) {
    notificationService.update(req.body._id, req.body,function (err, note) {
        notificationService.all(function (err, notes) {
            res.render('overview', {'notes':notes, 'config':config});
        });
    });
};