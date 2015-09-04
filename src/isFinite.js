'use strict';

module.exports = Number.isFinite || function (value) {
    return typeof value === 'number' && isFinite(value);
};
