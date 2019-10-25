"use strict";

module.exports.config = function (query, config = {
    "layout": false,
    "filter": false,
    "sortBy": {"createDate": false, "dueDate": false, "importance": false},
    "seq": "asc"
}) {
    if (query.layout === "dark") {
        config.layout = true;
        console.log("Dark Mode");

    } else if (query.layout === "white") {
        config.layout = false;
        console.log("White Mode");

    }

    //Filter
    else if (query.hideFinished === "true") {
        config.filter = true;
        console.log("Filter");
    } else if (query.hideFinished === "false") {
        config.filter = false;
        console.log("Unfilter");

    }

    //SortBY
    else if (query.sortBy === "finishDate") {
        config.sortBy.dueDate = query.sequence;
        config.sortBy.createDate = false;
        config.sortBy.importance = false;
        console.log("Sort BY Finish Date");
    } else if (query.sortBy === "createDate") {
        config.sortBy.dueDate = false;
        config.sortBy.createDate = query.sequence;
        config.sortBy.importance = false;
        console.log("Sort BY create Date");
    } else if (query.sortBy === "importance") {
        config.sortBy.dueDate = false;
        config.sortBy.createDate = false;
        config.sortBy.importance = query.sequence;
        console.log("Sort BY Importance");
    }
    return config;
};
