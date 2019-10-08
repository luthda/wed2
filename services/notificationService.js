"use strict";
const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notificationDB.db', autoload: true });

function Note(title, description, importance, dueDate) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.dueDate = dueDate;
    this.finished = false;
}

function publicAddNote(title, description, importance, dueDate, callback)
{
    console.log("  publicAddNote start");
    let note = new Note(title, description, importance, dueDate);
    db.insert(note, function(err, newDoc){
        console.log("    insert");
        if(callback){
            callback(err, newDoc);
        }
    });
    console.log("  publicAddNote end");
}


