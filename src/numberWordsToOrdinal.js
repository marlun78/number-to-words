'use strict';

module.exports = numberWordsToOrdinal;

var endsWith00 = /(hundred|thousand|(m|b|tr|quadr)illion)$/;
var endsWithTeen = /teen$/;
var endsWithY = /y$/;
var endsWith1Through12 = /( ?)(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/;
var ordinalLessThan13 = {
    one: 'first',
    two: 'second',
    three: 'third',
    four: 'fourth',
    five: 'fifth',
    six: 'sixth',
    seven: 'seventh',
    eight: 'eighth',
    nine: 'ninth',
    ten: 'tenth',
    eleven: 'eleventh',
    twelve: 'twelfth'
};

function numberWordsToOrdinal(words) {
    // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
    if (endsWith00.test(words) || endsWithTeen.test(words)) {
        return words + 'th';
    }
    // Ends with *y (20, 30, 40, 50, 60, 70, 80, 90)
    else if (endsWithY.test(words)) {
        return words.replace(endsWithY, 'ieth');
    }
    // Ends with one through twelve
    else if (endsWith1Through12.test(words)) {
        return words.replace(endsWith1Through12, function (match, space, numberWord) {
            return space ? '-' + ordinalLessThan13[numberWord] : ordinalLessThan13[numberWord];
        });
    }
    return words;
}