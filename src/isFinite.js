'use strict';

var globalIsFinite = isFinite || function(value) {
  return value < Infinity && value > -Infinity;
};
var isFinite = Number.isFinite || function (value) {
    return typeof value === 'number' && globalIsFinite(value);
};

module.exports = isFinite;
