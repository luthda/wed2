"use strict";

const notificationService = require('../services/notificationService');
const configService = require("../services/configService.js");
let humanize = require('../utils/dateUtil.js');


module.exports.index = function (req, res) {
    res.redirect('notes');
};

module.exports.notes = async function (req, res) {

    await landingPage(req, res);
};

module.exports.newNote = function (req, res) {
    let config = configService.config(req.query, req.cookies.config);
    res.render('newNote', {'config': config});
};

module.exports.addNote = function (req, res) {
    notificationService.add(req.body, async function (err, note) {
        res.redirect('/notes')
    });
};

module.exports.editNote = function (req, res) {
    notificationService.get(req.body.id, function (err, note) {
        let config = configService.config(req.query, req.cookies.config);
        res.render('editNote', {'note': note, 'config': config});
    });
};

module.exports.editedNote = function (req, res) {
    notificationService.update(req.body._id, req.body, async function (err, note) {
        res.redirect('/notes');
    });
};

//Helper Functions
async function landingPage(req, res) {
    await notificationService.all(async function (err, unfilteredUnsortedNotes) {
        let config = configService.config(req.query, req.cookies.config);
        let unsortedNotes = unfilteredUnsortedNotes;
        if (config.filter) {
            unsortedNotes = myFilter(unfilteredUnsortedNotes);
        }
        let notes = mySort(unsortedNotes, config);
        notes.forEach(function (note, index) {
            note.dueDate = humanize.humanizeDate(note.dueDate);
        });
        res.cookie("config", config);
        res.render('overview', {'notes': notes, 'config': config});
    });
}

function myFilter(unfilteredNotes) {
    return unfilteredNotes.filter(function (note) {
        return note.finished === false;
    });
}

function mySort(unsortedNotes, config) {
    if (config.sortBy.dueDate) {
        return unsortedNotes.sort((a, b) => {
            let out = new Date(b.dueDate ? b.dueDate : '2100-1-1') - new Date(a.dueDate ? a.dueDate : '2100-1-1');
            config.sortBy.dueDate !== "asc" ? out *= -1 : 1;
            return out;
        });
    } else if (config.sortBy.importance) {
        return unsortedNotes.sort((a, b) => {
            let out = b.importance - a.importance;
            config.sortBy.importance === "asc" ? out *= -1 : 1;
            return out;
        });
    } else if (config.sortBy.createDate) {
        return unsortedNotes.sort((a, b) => {
            let out = b.createDate - a.createDate;
            config.sortBy.createDate === "asc" ? out *= -1 : 1;
            return out;
        });
    } else {
        return unsortedNotes;
    }
}
