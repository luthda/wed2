'use strict';

let moment = require('moment');

function publicHumanizeDate(input) {
    if(input === ''){
        return input;
    }
    let date = new Date(input);
    let momentWarapper = moment(date);
    return momentWarapper.fromNow();
}

module.exports = {humanizeDate : publicHumanizeDate};