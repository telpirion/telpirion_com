/*
    Handles window.onload event for Yahtzee game.
    The onload event adds event handlers to the UI 
    in the game.
*/
(function () {
    "use strict";

    window.onload = function () {
        $(document).ready(function () {

            // Add event handlers to images and categories.
            $("svg").click(function (arg) {
                ui.clickImage(arg);
            });
            $(".cat-lower div").click(function (arg) {
                ui.clickImage(arg);
            });
            $(".yahtzee div").click(function (arg) {
                ui.clickImage(arg);
            });

            // Add event handler to controls.
            $("#reset").click(function () {
                ui.clickReset();
            });
            $("#enter").click(function () {
                ui.clickEnter();
            });
            $("#roll").click(function () {
                ui.clickRoll();
            });

            $(".bonus").attr("style", "display:none");
            $(".game-over").attr("style", "display:none");

            // Start a new game.
            game.init();
        });
    }
})();