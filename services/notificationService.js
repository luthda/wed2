"use strict";
const Datastore = require('nedb');
const db = new Datastore({ filename: '../data/notificationDB.db', autoload: true });

function Note(note){
        this.title = note.title;
        this.description = note.description;
        this.importance = note.importance;
        this.dueDate = note.dueDate;
        this.finished = note.finished;
        this.state = "OK";
}

function publicAddNote(note, callback)
{
    console.log("  publicAddNote start");
    let newNote = new Note(note);
    db.insert(newNote, function(err, newDoc){
        console.log("    insert");
        if(callback){
            callback(err, newDoc);
        }
    });
    console.log("  publicAddNote end");
}

function publicRemove(id, callback) {
    db.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs:true}, function (err, numDocs, doc) {
        callback(err, doc);
    });
}

function publicGet(id, callback)
{   db.findOne({ _id: id },{}, function (err, doc) {
    callback( err, doc);
});
}

function publicUpdate(id, newNote, callback){
    let note = new Note(newNote);
    db.update({_id: id}, note, function (err, docs) {
        callback(err, docs);

    });
}

function publicAll(callback)
{
    db.find({}, {},function (err, docs) {
        callback(err, docs);
    });
}

module.exports = {add : publicAddNote, delete : publicRemove, get : publicGet, all : publicAll, update : publicUpdate};