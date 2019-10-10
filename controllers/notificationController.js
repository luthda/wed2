"use strict";

const notificationService = require('../services/notificationService');
const configService = require("../services/configService.js");
const qs = require('qs');
const fs = require('fs');
let config = require('../data/config.json');


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
        config = await configService.sortByFinishDate();
        console.log("Sort BY Finish Date");
    } else if (req.query.sortBy === "createDate") {
        config = await configService.sortByCreateDate();
        console.log("Sort BY create Date");
    } else if (req.query.sortBy === "importance") {
        config = await configService.sortByImportance();
        console.log("Sort BY Importance");
    } else if (req.query.sortBy === "noSort") {
        config = await configService.noSort();
        console.log("No Sort By");
    }

    await landingPage(res);
};

module.exports.newNote = function (req, res) {
    res.render('newNote', {'config': config});
};

module.exports.addNote = function (req, res) {
    notificationService.add(req.body, async function (err, note) {
        await landingPage(res);
    });
};

module.exports.editNote = function (req, res) {
    notificationService.get(req.body.id, function (err, note) {
        res.render('editNote', {'note': note, 'config': config});
    });
};

module.exports.editedNote = function (req, res) {
    notificationService.update(req.body._id, req.body, async function (err, note) {
        await landingPage(res);
    });
};

//Helper Functions
async function landingPage(res) {
    if (config.filter) {
        notificationService.notFinished(function (err, unsortedNotes) {
            let notes = mySort(unsortedNotes);
            res.render('overview', {'notes': notes, 'config': config});
        });
    } else {
        await notificationService.all(async function (err, unsortedNotes) {
            let notes = await mySort(unsortedNotes);
            res.render('overview', {'notes': notes, 'config': config});
        });
    }
}

async function mySort(unsortedNotes) {
    if(config.sortBy.dueDate) {
        return unsortedNotes.sort((a, b) => new Date(b.dueDate ? b.dueDate : 1970-1-1) - new Date(a.dueDate ? a.dueDate : 1970-1-1));
    }else if(config.sortBy.importance) {
        return unsortedNotes.sort((a, b) => b.importance - a.importance);
    }else if(config.sortBy.createDate) {
        return unsortedNotes.sort((a, b) => b.createDate - a.createDate);
    }else {
        return unsortedNotes;
    }
}
