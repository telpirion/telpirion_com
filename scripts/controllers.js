/*
* controllers.js for telpirion.com.
* Copyright 2015, Eric M. Schmidt. All rights reserved.
*/

// The view model for the '#Home' page.
function homeController($scope) {

    // Begin the slide carousel.
    var slideIndex = 0;
    var slides = document.querySelectorAll(".slide");

    advanceSlide(0);

    document.querySelector(".left").addEventListener("click",
        function () {
            advanceSlide(-1);
        });

    document.querySelector(".right").addEventListener("click",
        function(){
            advanceSlide(1);
        });

    function advanceSlide(delta) {

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        var adjustedDelta = slideIndex + delta;

        if ((adjustedDelta >= 0) &&
            (adjustedDelta < slides.length)) {
            slideIndex = adjustedDelta;
        } else if (adjustedDelta == slides.length) {
            slideIndex = 0;
        } else {
            slideIndex = slides.length - 1;
        }
        slides[slideIndex].style.display = "block";
    }
}

// The view model for the '#Games' page.
function gamesController($scope, $location) {
    $scope.title = "Games";
    $scope.games = [
        {
            title: "Vikings!!!",
            url: "/Games/Vikings",
            description: "Vikings!!! is a simple platformer, built " +
                "entirely using HTML, CSS, and JavaScript. The " +
                "game uses a physics engine of my own design " +
                "and code.",
            img: "/images/vikings-promo.png"
        },
        {
            title: "Yahtzy",
            url: "/Games/Yahtzy",
            description: "Roll five dice and try to complete " +
                "a pair, three-of-a-kind, full-house, or even " +
                "a Yahtzy!",
            img: "/images/yahtzy-promo.png"
        },
        {
            title: "Conway's Game of Life",
            url: "/Games/Conway",
            description: "Build a colony of microbes that can " +
                "survive from one generation to the next."
        }
    ];
    $scope.onClick = function(url) {
        console.log(url);
        $location.path(url);
        //$window.location = url;
    }
}

// The view model for the '#Apps' page
function resumeController($scope) {
    $scope.title = "Resume";
}

// The view model for the '#Apps' page
function appsController($scope, $window) {
    $scope.title = "Apps";

    $scope.appsList = [
        {
            title: "Latin Reader for Android",
            url: "https://play.google.com/store/apps/details?id=com.ericmschmidt.latinreader",
            description: "Read one of several classical works in the original Latin " +
            "on your Android device.",
            img: "images/google-play-badge.png"
        }, {
            title: "Latin Reader for Windows",
            url: "https://www.microsoft.com/en-us/store/apps/latin-reader/9wzdncrfjjc0",
            description: "Read one of several classical works in the original Latin " +
            "on your Windows 10, Windows 8.1, or Windows Phone 8.1 device.",
            img: "https://assets.windowsphone.com/f2f77ec7-9ba9-4850-9ebe-77e366d08adc/English_Get_it_Win_10_InvariantCulture_Default.png"
        }
    ];
    $scope.onClick = function(url) {
        console.log(url);
        $window.location.href = url;
    }
}

// The view model for the '#Blog' page.
function blogController($scope) {
    $scope.title = "Blog";
    $scope.feed = [{
        title: "First blog post",
        date: "December 22, 2015",
        body: "First blog post on the new site!"
    }, {
        title: "Shamepile Software is now Telpirion.com",
        body: "This web site has been rebranded to Telpirion.com, the personal " +
                "web site for Eric M. Schmidt.",
        date: "June 28, 2016"
    }];
}

// The view model for the '#About' page.
function aboutController($scope) {
    $scope.arrowDownUrl = "images/ic_arrow_drop_down_black_24dp_2x.png";
    $scope.arrowUpUrl = "images/ic_arrow_drop_up_black_24dp_2x.png";

    $scope.title = "About";
    $scope.bodyContent = "Find general information about the games and apps on this site.";
    $scope.gamesExpando = "About the games";
    $scope.appsExpando = "About the apps";
    $scope.appsBodyContent = "I have published a couple of apps on the Google Play Store and the Windows" +
        " Store.";
    $scope.contactExpando = "Contact me";
    $scope.contactMail = "eric.schmidt@telpirion.com";

    // Wire up the expandos.
    $(".expando").click(function(evt){
        var heading = evt.target.nodeName.toLowerCase() == "img" ?
                evt.target.parentElement : evt.target;

            console.log(evt.target);

            var sectionContent = heading.nextElementSibling;
            var nextSection = sectionContent.parentElement.nextElementSibling;

            if (sectionContent.classList.contains("hidden")) { // Expand
                $(heading).children(".icon")
                    .attr("src", $scope.arrowUpUrl);

                sectionContent.classList.remove("hidden");
                sectionContent.classList.add("shown");

            } else { // Collapse
                $(heading).children(".icon")
                    .attr("src", $scope.arrowDownUrl);

                sectionContent.classList.remove("shown");
                sectionContent.classList.add("hidden");
            }
    });

}

// The viewmodel for the "Vikings!!" game.
function vikingsController($scope) {
    $scope.title = "Vikings!!!";
    $.getScript("scripts/vikings/main.js");
}

// The viewmodel for #/Games/Yahtzy
function yahtzyController($scope) {
    $scope.title = "Yahtzy";

    var base = "scripts/yahtzy";

    $.when(
        $.getScript( base + "/game.js"),
        $.getScript( base + "/ui-controllers.js"),
        $.getScript( base + "/robot.js" ),
        $.getScript( base + "/utilities.js" ),
        $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
    )
    .done(function(){
        console.log("yahtzee scripts loaded");
        $.getScript( base + "/main.js" )
    });
}

// The viewModel for #/Games/Conway
function conwayController($scope) {
    $scope.title = "Conway's Game of Life";

    var base = "scripts/conway";

    $.when(
        $.getScript( base + "/game.js"),
        $.getScript( base + "/ui.js"),
        $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
    )
    .done(function(){
        console.log("conway scripts loaded");
        $.getScript( base + "/main.js" )
    });
}

// The viewmodel for the "Scratch" page.
function demoController($scope, $location) {
    $scope.title = "Scratch";
    $scope.location = $location.absUrl();
}

telpirionApp
    .controller("homeController", homeController)
    .controller("resumeController", resumeController)
    .controller("gamesController", ["$scope", "$location", gamesController])
    .controller("appsController", ["$scope", "$window",appsController])
    .controller("blogController", blogController)
    .controller("aboutController", aboutController)
    .controller("vikingsController", vikingsController)
    .controller("yahtzyController", yahtzyController)
    .controller("conwayController", conwayController)
    .controller("demoController", ["$scope", "$location", demoController]);