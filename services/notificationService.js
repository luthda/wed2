"use strict";
const Datastore = require('nedb');
const db = new Datastore({filename: '../data/notificationDB.db', autoload: true});

function UpdateNote(note) {
    this.title = note.title;
    this.description = note.description;
    this.importance = note.importance;
    this.stars = createStars(this.importance);
    this.dueDate = note.dueDate;
    this.finished = note.finished ? note.finished : false;
}


function Note(note) {
    this.title = note.title;
    this.description = note.description;
    this.importance = note.importance;
    this.stars = createStars(this.importance);
    this.dueDate = note.dueDate;
    this.finished = note.finished ? note.finished : false;
    this.createDate = new Date();
    this.state = "OK";
}

/* Stars */
function createStars(importanceValue) {
    let importanceStars = "";
    for (let i = 0; i < importanceValue; i++){
        importanceStars += "*";
    }
    return importanceStars;
}

function publicAddNote(note, callback) {
    console.log("  publicAddNote start");
    let newNote = new Note(note);
    db.insert(newNote, function (err, newDoc) {
        console.log("    insert");
        if (callback) {
            callback(err, newDoc);
        }
    });
    console.log("  publicAddNote end");
}

function publicRemove(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs: true}, function (err, numDocs, doc) {
        callback(err, doc);
    });
}

function publicGet(id, callback) {
    db.findOne({_id: id}, {}, function (err, doc) {
        callback(err, doc);
    });
}

function publicUpdate(id, newNote, callback) {
    let note = new UpdateNote(newNote);
    db.update({_id: id}, {$set: note}, function (err, docs) {
        callback(err, docs);
    });
}

function publicAll(callback) {
    db.find({}, {}, function (err, docs) {
        callback(err, docs);
    });
}

function publicNotFinished(callback) {
    db.find({$not:{finished: 'on'}}, {}, function (err, docs) {
        callback(err, docs);
    });
}

module.exports = {
    add: publicAddNote,
    delete: publicRemove,
    get: publicGet,
    all: publicAll,
    update: publicUpdate,
    notFinished: publicNotFinished
};