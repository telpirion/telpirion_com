var utilities = (function () {
    "use strict";

    var YAHTZEE_PATTERN = "0000";
    var FULLHOUSE_PATTERN = /00\d0|0\d00/;
    var SMSTRAIGHT_PATTERN  = "111|1+01+";
    var LGSTRAIGHT_PATTERN  = "1111";
    var THREEKIND_PATTERN = "00";
    var FOURKIND_PATTERN= "000";

    var defaultVal = [{ val: 0 }];

    var _categoryState = {
        open: "open",
        closed: "closed",
        selected: "selected"
    }

    // Sort the dice in ascending order.
    function _sortDice(dice) {
        var tempVal;

        // Bubble sort.
        for (var i = 0; i < dice.length; i++) {
            for (var j = 0; j < dice.length; j++) {
                if (dice[i].val <= dice[j].val) {
                    tempVal = dice[j];
                    dice[j] = dice[i];
                    dice[i] = tempVal;
                }
            }
        }

        return dice;
    }

    // Get the relationships of the dice, as a string.
    function getRelationships(diceVals) {
        var pattern = "";
        for (var i = 0; i < (diceVals.length - 1); i++) {
            pattern += (diceVals[i + 1].val - diceVals[i].val).toString();
        }
        return pattern;
    }

    // Determine whether the roll can be scored as a full house.
    function validateFullHouse(diceVals) {
        var pattern = getRelationships(diceVals);
        var regex = FULLHOUSE_PATTERN;

        return (regex.test(pattern)) ?
            [{ val: 25 }] : defaultVal;
    }

    // Determine whether the roll can be scored as a straight.
    function validateStraightCategory(diceVals, type) {
        var pattern = getRelationships(diceVals);
        var regex;
        var scoreVal = defaultVal;

        switch (type) {
            case "Small":
                regex = new RegExp(SMSTRAIGHT_PATTERN);
                scoreVal = regex.test(pattern) ?
                    [{ val: 30 }] : defaultVal;
                break;
            case "Large":
                regex = new RegExp(LGSTRAIGHT_PATTERN);
                scoreVal = regex.test(pattern) ?
                    [{ val: 40 }] : defaultVal;
                break;
        }

        return scoreVal;
    }

    // Determine whether the dice can be scored as a kinds.
    function validateKindsCategory(diceVals, type) {
        var pattern = getRelationships(diceVals);
        var scoreVals = defaultVal;

        switch (type) {
            case "ThreeKind":
                if (pattern.indexOf("00") > -1) {
                    scoreVals = diceVals;
                }
                break;
            case "FourKind":
                if (pattern.indexOf("000") > -1) {
                    scoreVals = diceVals;
                }
                break;
            case "Yahtzee":
                if (pattern.indexOf("0000") > -1) {
                    scoreVals = [{ val: 50 }];
                }
        }

        return scoreVals;
    }

    // Count the occurrences of the specified number.
    function validateNumberCategory(diceVals, num) {
        var scoredVals = [];
        for (var i = 0; i < diceVals.length; i++) {
            (diceVals[i].val == num) ?
                scoredVals.push(diceVals[i]) : null;
        }
        return scoredVals;
    }

    // Check that the dice can be scored as the category.
    // "ThreeKind", "FourKind", "Small", "Large", "FullHouse", "Chance", "Yahtzee"
    function validateRoll(diceVals, type) {
        var scoredVals = [{ val: 0 }];
        var sortedDice = _sortDice(diceVals);
        switch (type) {
            case "Ones":
                scoredVals = validateNumberCategory(sortedDice, 1);
                break;
            case "Twos":
                scoredVals = validateNumberCategory(sortedDice, 2);
                break;
            case "Threes":
                scoredVals = validateNumberCategory(sortedDice, 3);
                break;
            case "Fours":
                scoredVals = validateNumberCategory(sortedDice, 4);
                break;
            case "Fives":
                scoredVals = validateNumberCategory(sortedDice, 5);
                break;
            case "Sixes":
                scoredVals = validateNumberCategory(sortedDice, 6);
                break;
            case "ThreeKind":
                scoredVals = validateKindsCategory(sortedDice, "ThreeKind");
                break;
            case "FourKind":
                scoredVals = validateKindsCategory(sortedDice, "FourKind");
                break;
            case "Yahtzee":
                scoredVals = validateKindsCategory(sortedDice, "Yahtzee");
                break;
            case "Small":
                scoredVals = validateStraightCategory(sortedDice, "Small");
                break
            case "Large":
                scoredVals = validateStraightCategory(sortedDice, "Large");
                break
            case "FullHouse":
                scoredVals = validateFullHouse(sortedDice);
                break;
            default:
                scoredVals = [{ val: 0 }];
        }
        return scoredVals;
    }

    // Add up the roll scored and return the roll.
    function scoreRoll(diceVals, type) {

        var scoredValues = (type == "Chance") ?
            diceVals :
            validateRoll(diceVals, type);
        var score = 0;

        // Add up the scoreable dice values.
        for (var i = 0; i < scoredValues.length; i++) {
            score += Number(scoredValues[i].val);
        }
        return score;
    }

    // Returns an integer between one and six.
    function generateRoll() {
        return Math.floor(Math.random() * 6) + 1;
    }

    return {
        categoryState: _categoryState,
        getRelationships: getRelationships,
        validateFullHouse: validateFullHouse,
        validateStraightCategory: validateStraightCategory,
        validateKindsCategory: validateKindsCategory,
        validateNumberCategory: validateNumberCategory,
        validateRoll: validateRoll,
        scoreRoll: scoreRoll,
        generateRoll: generateRoll
    };
})();