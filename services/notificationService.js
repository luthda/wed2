"use strict";
const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notificationDB.db', autoload: true });

class Note{
    constructor(title, description, importance, date, done){
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.date = date;
        this.done = done;
    }
}

class NotificationStore {
    constructor() {

    }

    add(title, description, importance, date, done)  {
        let note = new Note(title, description, importance, date, done);
        db.insert(note, function (err, doc) {
            console.log("Inserted ", doc.name);
        })
    }

    get(id) {
        db.findOne({_id: id}, function (err, doc) {
            console.log("Get ", doc.name);
        })
    }

    set(id, done) {
        db.update({_id: id}, {$set: {"done": done}}, function (err, doc) {
            console.log("Updated ", doc.name);
        });
    }

    all() {
        db.find({}, function (err, doc) {
            console.log("all", doc.name);
        })
    }
}