"use strict";

const notificationService = require('../services/notificationService');
const configService = require("../services/configService.js");
let config = configService.configuration;
let humanize = require('../utils/dateUtil.js');


module.exports.index = async function (req, res) {
    if (Object.keys(req.query).length === 0) {
        console.log("Empty Query");
    }
    //Layout
    else if (req.query.layout === "dark") {
        config = await configService.dark();
        console.log("Dark Mode");

    } else if (req.query.layout === "white") {
        config = await configService.white();
        console.log("White Mode");

    }

    //Filter
    else if (req.query.hideFinished === "true") {
        config = await configService.filter();
        console.log("Filter");
    } else if (req.query.hideFinished === "false") {
        config = await configService.unfilter();
        console.log("Unfilter");

    }

    //SortBY
    else if (req.query.sortBy === "finishDate") {
        config = await configService.sortByFinishDate(req.query.sequence);
        console.log("Sort BY Finish Date");
    } else if (req.query.sortBy === "createDate") {
        config = await configService.sortByCreateDate(req.query.sequence);
        console.log("Sort BY create Date");
    } else if (req.query.sortBy === "importance") {
        config = await configService.sortByImportance(req.query.sequence);
        console.log("Sort BY Importance");
    } /* else if (req.query.sortBy === "noSort") {
        config = await configService.noSort();
        console.log("No Sort By");
    } */

    await landingPage(req, res);
};

module.exports.newNote = function (req, res) {
    res.render('newNote', {'config': config});
};

module.exports.addNote = function (req, res) {
    notificationService.add(req.body, async function (err, note) {
        await landingPage(req, res);
    });
};

module.exports.editNote = function (req, res) {
    notificationService.get(req.body.id, function (err, note) {
        res.render('editNote', {'note': note, 'config': config});
    });
};

module.exports.editedNote = function (req, res) {
    notificationService.update(req.body._id, req.body, async function (err, note) {
        await landingPage(req, res);
    });
};

//Helper Functions
async function landingPage(req, res) {
    await notificationService.all(async function (err, unfilteredUnsortedNotes) {
        let unsortedNotes = unfilteredUnsortedNotes;
        if (config.filter) {
            unsortedNotes = myFilter(unfilteredUnsortedNotes);
        }
        let seq = req.query.sequence;
        let notes = mySort(seq, unsortedNotes);
        notes.forEach(function (note, index) {
            note.dueDate = humanize.humanizeDate(note.dueDate);
        });
        res.render('overview', {'notes': notes, 'config': config});
    });
}

function myFilter(unfilteredNotes) {
    return unfilteredNotes.filter(function (note) {
        return note.finished === false;
    });
}

function mySort(seq, unsortedNotes) {
    if (config.sortBy.dueDate) {
        return unsortedNotes.sort((a, b) => {
            let out = new Date(b.dueDate ? b.dueDate : 1970 - 1 - 1) - new Date(a.dueDate ? a.dueDate : 1970 - 1 - 1);
            seq === "asc" ? out *= -1 : 1;
            return out;
        });
    } else if (config.sortBy.importance) {
        return unsortedNotes.sort((a, b) => {
            let out = b.importance - a.importance;
            seq === "asc" ? out *= -1 : 1;
            return out;
        });
    } else if (config.sortBy.createDate) {
        return unsortedNotes.sort((a, b) => {
            let out = b.createDate - a.createDate;
            seq === "asc" ? out *= -1 : 1;
            return out;
        });
    } else {
        return unsortedNotes;
    }
}
