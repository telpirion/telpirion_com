///<reference path="game.js" />
var ui = (function () {
    "use strict";

    // SVG markup for 'dice'
    var diceFaces = {
        "1": [[37, 37]],
        "2": [[15, 15], [60, 60]],
        "3": [[15, 15], [37, 37], [60, 60]],
        "4": [[15, 15], [15, 60], [60, 15], [60, 60]],
        "5": [[15, 15], [15, 60], [37, 37], [60, 15], [60, 60]],
        "6": [[15, 15], [15, 60], [15, 37], [60, 15], [60, 60], [60, 37]]
    };

    // Change the border of a scoring category.
    function _clickCategory(item, id) {
        if (game.isCategoryAvailable(id)) {

            // Update the category in the game model.
            game.selectCategory(id);

            // Change the category's border color.
            _updateBorder(item, "cat");
        }
    }

    // Change the border of a die.
    function _clickDie(item, id) {
        if ((game.rolls > 0) &&
            game.isStarted ){
            var selectedDie;

            // Convert the id class to an index value.
            switch (id) {
                case "A":
                    selectedDie = 0;
                    break;
                case "B":
                    selectedDie = 1;
                    break;
                case "C":
                    selectedDie = 2;
                    break;
                case "D":
                    selectedDie = 3;
                    break;
                case "E":
                    selectedDie = 4;
                    break;
                default:
                    alert("Error: Cannot determine selected die.")
            }

            // Hold the die.
            game.holdDie(selectedDie);

            // Update the border.
            _updateBorder(item, "die");

        }
    }

    // Update a UI item's border.
    function _updateBorder(item, type) {
        var classes = item.classList;
        var currBorder;
        var newBorder;
        
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].indexOf("border") > -1) {
                currBorder = classes[i];
            }
        }

        switch (currBorder) {
            case "borderBlack":
                newBorder = (type == "die") ? "borderRed" : "borderYellow";
                break;
            case "borderRed":
            case "borderYellow":
                newBorder = "borderBlack";            
        }
        item.classList.remove(currBorder);
        item.classList.add(newBorder);
    }

    // Update a UI item's border.
    function _resetBorder(item) {
        var classes = item.classList;
        var currBorder;
        var newBorder = "borderBlack";

        for (var i = 0; i < classes.length; i++) {
            if ((classes[i].indexOf("border") > -1) && 
                (classes[i] != newBorder)){
                currBorder = classes[i];
            }
        }

        item.classList.remove(currBorder);
        item.classList.add(newBorder);
    }

    // Update the dice UI.
    function _setRoll(diceVals) {
        var diceGroups = $(".dice svg g");
        diceGroups.empty();

        for (var i = 0; i < 5; i++) {
            var currVal = diceVals[i].val;
            var diceFace = diceFaces[currVal.toString()];
            var diceFaceHtml = _buildDieHTML(diceFace);
            diceGroups[i].innerHTML = diceFaceHtml;
        }
    }

    // Build an SVG die from a 2-dimensional array.
    function _buildDieHTML(dieFace) {
        var rawHTML = "";

        var circleTemplate = function () {
            return '<circle r="10" cx="{0}" cy="{1}"></circle>';
        }
            
        for (var i = 0; i < dieFace.length; i++) {
            var coords = dieFace[i];
            var newCircle = circleTemplate();
            newCircle = newCircle.replace("{0}", coords[0].toString());
            newCircle = newCircle.replace("{1}", coords[1].toString());
            rawHTML += newCircle;
        }

        return rawHTML;
    }

    // Get the selected category.
    function _getSelectedCategories() {
        var selectedCategories = [];
        var cats = $(".cat");

        cats.each(function () {
            $(this)[0].classList.contains("borderYellow") ?
            selectedCategories.push($(this)[0]) : null;
        });

        return selectedCategories;
    }

    // Get the ID of a selected item.
    function _getId(itemClasses) {

        var idClass;

        // Determine which item was clicked.
        for (var i = 0; i < itemClasses.length; i++) {
            var currClass = itemClasses[i];
            if ((currClass != "die") &&
                (currClass != "cat") &&
                (currClass.indexOf("border") == -1)) {
                idClass = currClass;
            }
        }

        return idClass;
    }

    // Update score.
    function _updateScore(playerScore, p2, p3, p4) {
        var scoreString = playerScore + "<br/>";
        scoreString += "Player 2: " + p2 + "<br/>";
        scoreString += "Player 3: " + p3 + "<br/>";
        scoreString += "Player 4: " + p4 + "<br/>";

        $(".score").html(scoreString);
    }

    // React when the user clicks an image.
    function clickImage(args) {
        var clickedItem = args.target; 
        var idClass;
        var handler;

        if (clickedItem.tagName.toLowerCase() == "span") {
            clickedItem = clickedItem.parentElement;
        } else if (clickedItem.tagName.toLowerCase() == "circle") {
            clickedItem = clickedItem.parentElement.parentElement;
        }

        var itemClasses = clickedItem.classList;

        if (itemClasses.contains("cat")) {
            handler = _clickCategory;
        } else {
            handler = _clickDie;
        }

        idClass = _getId(itemClasses);

        handler(clickedItem, idClass);
    }

    // Reset the UI and start a new game.
    function clickReset() {

        // Start a new game.
        game.init();

        // Reset the borders.
        $(".cat").each(function (index) {
            _resetBorder($(this)[0]);
        });

        $(".die").each(function (index) {
            _resetBorder($(this)[0]);
            $(this).attr("src", encodeURI("Assets/Die_1.png"));
        });

        // Reset the score display.
        $(".score").html("<div>Your score: 0<br />" +
                        "Player 2: 0<br />" +
                        "Player 3: 0<br />" +
                        "Player 4: 0<br /></div>");

        $(".bonus").attr("style", "display:none");
        $(".game-over").attr("style", "display:none");

        // Re-enable the game buttons.
        $("#enter").attr("disabled", false);
        $("#roll").attr("disabled", false);
    }

    // Roll the dice.
    function clickRoll() {
        if (game.rolls > 0) {
            game.rolls--;

            // Get the number of held dice.
            var diceVals = game.rollDice();

            // Update the UI.
            _setRoll(diceVals);
        }
    }

    // Score the current roll.
    function clickEnter() {
        $(".output").text("");
        var selectedCategories = _getSelectedCategories();

        if (selectedCategories.length == 1) {
            var idClass = _getId(selectedCategories[0].classList);
            game.scoreRoll(idClass);

            // Update the category UI.
            selectedCategories[0].classList.remove("borderYellow");
            selectedCategories[0].classList.add("borderGreen");

            // TODO: get the opponents score.
            var p2 = game.getOpponentsScore(0);
            var p3 = game.getOpponentsScore(1);
            var p4 = game.getOpponentsScore(2);

            // Update the score.
            var scoreString = game.getScore();
            _updateScore(scoreString, p2, p3, p4);

            // Set the bonus if necessary.
            if (game.getTopScore() >= 63) {
                $(".bonus").attr("style", "");
            }

            // Set up for the next turn.
            game.rolls = 3;
            game.turns--;

            if (game.turns > 0) {
                // Update the dice.
                $(".die").each(function () {
                    _resetBorder($(this)[0]);
                });
            }
            else {
                $("#enter").attr("disabled", "true");
                $("#roll").attr("disabled", "true");
                $(".game-over").attr("style", "display:block");
            }

        } else {
            $(".output").text("Please select one and only one category.")
        }
    }

    return {
        clickImage: clickImage,
        clickReset: clickReset,
        clickRoll: clickRoll,
        clickEnter: clickEnter
    };
})();