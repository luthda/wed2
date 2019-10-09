"use strict";
const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notificationDB.db', autoload: true });

function Note(title, description, importance, date, done){
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.date = date;
        this.done = done;
        this.state = "OK";
}

function publicAddNote(title, description, importance, date, done, callback)
{
    console.log("  publicAddNote start");
    let note = new Note(title, description, importance, date, done);
    db.insert(note, function(err, newDoc){
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
{   db.findOne({ _id: id }, function (err, doc) {
    callback( err, doc);
});
}

function publicAll()
{
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNote, delete : publicRemove, get : publicGet, all : publicAll};