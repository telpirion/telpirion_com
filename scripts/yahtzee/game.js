var game = (function () {
    "use strict";

    var _dice;
    var _catSelected = {};
    var _playerScore;
    var _rollsRemaining;
    var _turnsRemaining;
    var _isStarted;
    var _opponents;
    var _topScore;
    var _bonusReceived;
    var _that = this;

    var _categoryNames = ["Ones", "Twos", "Threes", "Fours", "Fives", "Sixes",
        "ThreeKind", "FourKind", "Small", "Large", "FullHouse", "Chance", "Yahtzee"
    ];

    function _resetDice() {
        _dice = [
            { val: 0, held: false },
            { val: 0, held: false },
            { val: 0, held: false },
            { val: 0, held: false },
            { val: 0, held: false }];
    }

    // Initialize a new game.
    function init() {
        _resetDice();

        _playerScore = 0;
        _topScore = 0;
        _rollsRemaining = 3;
        _turnsRemaining = 13;
        _isStarted = false;
        _bonusReceived = false;

        for (var i = 0; i < _categoryNames.length; i++) {
            var catName = _categoryNames[i];
            _catSelected[catName] = utilities.categoryState.open;
        }

        _opponents = [];
        _opponents.push(new AI.Robot());
        _opponents.push(new AI.Robot());
        _opponents.push(new AI.Robot());
        _opponents.push(new AI.Robot());
    }

    // Hold the specified die.
    function holdDie(index) {
        var currDie = _dice[index];
        if (currDie.held) {
            currDie.held = false;
        } else {
            currDie.held = true;
        }

        console.log("Die #" + (index + 1) + " is held: " + currDie.held);
    }

    // Select / deselect the specified scoring category.
    function selectCategory(cat) {
        var currValue = _catSelected[cat];
        if (currValue == utilities.categoryState.selected) {
            _catSelected[cat] = utilities.categoryState.open;
        }
        else {
            _catSelected[cat] = utilities.categoryState.selected;
        }

        console.log("Category " + cat + " is " + _catSelected[cat]);
    }

    // Get the player's current score.
    function getScore() {
        return "Your score: " + _playerScore.toString();
    }

    function getTopScore() {
        return _topScore;
    }

    // Determine whether the player can select a category or not.
    function isCategoryAvailable(id) {
        if (_catSelected[id] != utilities.categoryState.closed) {
            return true;
        }
        return false;
    }

    // Rolls the available dice and returns the results.
    function rollDice() {
        _isStarted = true;
        for (var i = 0; i < _dice.length; i++) {
            if (!_dice[i].held) {
                _dice[i].val = utilities.generateRoll();
            }
        }
        return _dice;
    }

    // Score the current roll for the specified category.
    function scoreRoll(category) {
        var diceValue = utilities.scoreRoll(_dice, category);
        _playerScore += diceValue;
        
        // Check if the bonus has been hit.
        if ((category == "Ones") ||
            (category == "Twos") ||
            (category == "Threes") ||
            (category == "Fours") ||
            (category == "Fives") ||
            (category == "Sixes")) {
            _topScore += diceValue;
        }

        if ((_topScore >= 63) && (!_bonusReceived)) {
            _playerScore += 75;
            _bonusReceived = true;
        }

        _resetDice();

    }

    // Get the total score the the specified AI opponent. 
    function getOpponentsScore(number) {
        var robot = _opponents[number];
        robot.roll();
        return robot.totalScore;
    }

    var _returnedObject = {
        init: init,
        holdDie: holdDie,
        selectCategory: selectCategory,
        getScore: getScore,
        getTopScore: getTopScore,
        isCategoryAvailable: isCategoryAvailable,
        rollDice: rollDice,
        scoreRoll: scoreRoll,
        getOpponentsScore: getOpponentsScore
    };

    Object.defineProperties(_returnedObject, {
        rolls: {
            set: function (x) { _rollsRemaining = x },
            get: function () { return _rollsRemaining; }
        },
        turns: {
            set: function (x) { _turnsRemaining = x },
            get: function () { return _turnsRemaining; }
        },
        isStarted: {
            get: function () { return _isStarted; }
        }
    });

    return _returnedObject;
})()