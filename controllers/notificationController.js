"use strict";

const notificationService = require('../services/notificationService');
const configService = require("../services/configService.js");
const qs = require('qs');
const fs = require('fs');
let config = require('../data/config.json');

async function readJSON() {
    const json = await fs.readFileSync("../data/config.json");
    return await JSON.parse(json);
}

module.exports.index = function (req, res) {
    notificationService.all(function (err, notes) {
        res.render('overview', {'notes': notes, 'config': config});
    });
};

module.exports.newNote = function (req, res) {
    res.render('newNote', {'config': config});
};

module.exports.addNote = function (req, res) {
    notificationService.add(req.body, function (err, note) {
        res.render('newNote', {'config': config});
    });
};

module.exports.editNote = function (req, res) {
    notificationService.get(req.body.id, function (err, note) {
        res.render('editNote', {'note': note, 'config': config});
    });
};

module.exports.editedNote = function (req, res) {
    notificationService.update(req.body._id, req.body, function (err, note) {
        notificationService.all(function (err, notes) {
            res.render('overview', {'notes': notes, 'config': config});
        });
    });
};

module.exports.switchStyle = async function (req, res) {
    if (req.body.layout === "dark") {
        config = await configService.dark();
        console.log("Dark Mode");
    } else {
        config = await configService.white();
        console.log("White Mode");
    }
    await notificationService.all(function (err, notes) {
        res.render('overview', {'notes': notes, 'config': config});
    });
};