"use strict";
const fs = require('fs');

async function readJSON(){
    const json = await fs.readFileSync("../data/config.json");
    return await JSON.parse(json);
}

async function writeJSON(json){
    const data = JSON.stringify(json);
    await fs.writeFileSync('../data/config.json', data);
}

async function publicFilter(){
    let config = await readJSON();
    config.filter = true;
    await writeJSON(config);
    return config;
}

async function publicUnfilter() {
    let config = await readJSON();
    config.filter = false;
    await writeJSON(config);
    return config;
}

async function publicSortByFinishDate(seq) {
    let config = await readJSON();
    config.sortBy.dueDate = seq;
    config.sortBy.createDate = false;
    config.sortBy.importance = false;
    await writeJSON(config);
    return config;
}

async function publicSortByCreateDate(seq) {
    let config = await readJSON();
    config.sortBy.dueDate = false;
    config.sortBy.createDate = seq;
    config.sortBy.importance = false;
    await writeJSON(config);
    return config;
}


async function publicSortByImportance(seq) {
    let config = await readJSON();
    config.sortBy.dueDate = false;
    config.sortBy.createDate = false;
    config.sortBy.importance = seq;
    await writeJSON(config);
    return config;
}
async function publicSortByNone() {
    let config = await readJSON();
    config.sortBy.dueDate = false;
    config.sortBy.createDate = false;
    config.sortBy.importance = false;
    await writeJSON(config);
    return config;
}


async function publicDarkMode() {
     let config = await readJSON();
     config.layout = true;
     await writeJSON(config);
     return config;
}

async function publicWhiteMode() {
    let config = await readJSON();
    config.layout = false;
    await writeJSON(config);
    return config;
}

module.exports = {
    filter: publicFilter,
    unfilter: publicUnfilter,
    sortByFinishDate: publicSortByFinishDate,
    sortByCreateDate: publicSortByCreateDate,
    sortByImportance: publicSortByImportance,
    noSort:publicSortByNone,
    dark: publicDarkMode,
    white: publicWhiteMode,
};
