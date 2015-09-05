'use strict';

var globalIsFinite = isFinite;
var isFinite = Number.isFinite || function (value) {
    return typeof value === 'number' && globalIsFinite(value);
};

module.exports = isFinite;
