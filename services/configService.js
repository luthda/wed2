"use strict";
const config = require('../data/config');


async function publicFilter() {
   await config.filter = true;
}

async function publicUnfilter() {
   await config.filter = false;
}

async function publicSortByFinishDate() {
   await config.sortBy = 'finishDate'
}
async function publicSortByCreateDate() {
   await config.sortBy = 'createDate'
}
async function publicSortByImportance() {
    await config.sortBy = 'importance'
}
module.exports = {filter: publicFilter, unfilter:publicUnfilter, sortByFinishDate: publicSortByFinishDate,
sortByCreateDate: publicSortByCreateDate, sortByImportance: publicSortByImportance};
