"use strict";
const fs = require('fs');

let config = {"layout": false,
    "filter": false,
    "sortBy": {"createDate": false, "dueDate": false, "importance": false}
};

async function publicFilter() {
    config.filter = true;
    return config;
}

async function publicUnfilter() {
   config.filter = false;
   return config;
}

async function publicSortByFinishDate(seq) {
    config.sortBy.dueDate = seq;
    config.sortBy.createDate = false;
    config.sortBy.importance = false;
    return config;
}

async function publicSortByCreateDate(seq) {
    config.sortBy.dueDate = false;
    config.sortBy.createDate = seq;
    config.sortBy.importance = false;
    return config;
}


async function publicSortByImportance(seq) {
    config.sortBy.dueDate = false;
    config.sortBy.createDate = false;
    config.sortBy.importance = seq;
    return config;
}

async function publicSortByNone() {
    config.sortBy.dueDate = false;
    config.sortBy.createDate = false;
    config.sortBy.importance = false;
    return config;
}


async function publicDarkMode() {
    config.layout = true;
    return config;
}

async function publicWhiteMode() {
    config.layout = false;
    return config;
}

module.exports = {
    filter: publicFilter,
    unfilter: publicUnfilter,
    sortByFinishDate: publicSortByFinishDate,
    sortByCreateDate: publicSortByCreateDate,
    sortByImportance: publicSortByImportance,
    noSort: publicSortByNone,
    dark: publicDarkMode,
    white: publicWhiteMode,
    configuration: config
};
