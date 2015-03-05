'use strict';

module.exports = isFinite_;

function isFinite_(value) {
    return typeof value === 'number' && isFinite(value);
}