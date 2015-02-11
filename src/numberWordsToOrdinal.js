'use strict';

module.exports = numberWordsToOrdinal;

var endsWithDoubleZero = /(hundred|thousand|(m|b|tr|quadr)illion)$/;
var endsWithTeen = /teen$/;
var endsWithY = /y$/;
var endsWithOneThroughTwelve = /(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)$/;
var ordinalLessThanThirteen = {
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
    if (endsWithDoubleZero.test(words) || endsWithTeen.test(words)) {
        return words + 'th';
    }
    // Ends with *y (20, 30, 40, 50, 60, 70, 80, 90)
    else if (endsWithY.test(words)) {
        return words.replace(endsWithY, 'ieth');
    }
    // Ends with one through twelve
    else if (endsWithOneThroughTwelve.test(words)) {
        return words.replace(endsWithOneThroughTwelve, function (match, numberWord) {
            return ordinalLessThanThirteen[numberWord];
        });
    }
    return words;
}