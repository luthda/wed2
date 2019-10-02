"use strict";
const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notificationDB.db', autoload: true });
