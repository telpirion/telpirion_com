/*
* home.js for ShamePile Software.
* Copyright 2015, Eric M. Schmidt. All rights reserved.
*/
(function () {
    "use strict";

    var _games = [
        { title: "Vikings!!!", url: "../Vikings", aboutURL: "../Vikings/About" },
        { title: "Yahtzee", url: "../Yahtzee/Index", aboutURL: "../Yahtzee/About" },
        { title: "Modulus", url: "../Modulus/Index", aboutURL: "../Modulus/About" }
    ];

    var gamesList = new WinJS.Binding.List(_games);

    $(document).ready(function () {

        WinJS.UI.processAll();

        // Build the game list view.
        var gameViewEl = $(".game-list")[0];
        var gameView = new WinJS.UI.ListView(gameViewEl);
        gameView.itemTemplate = $(".game-list-template")[0];
        gameView.itemDataSource = gamesList.dataSource;
        gameView.layout = WinJS.UI.GridLayout;
        gameView.selectionMode = "none";
        gameView.tapBehavior = "invokeOnly";

        gameView.oniteminvoked = function (evt) {
            console.log(evt.detail);
            var selectedIndex = evt.detail.itemIndex;
            var selectedItem = gamesList.getItem(selectedIndex);
            window.location = selectedItem.data.url;
        }

    });

})();