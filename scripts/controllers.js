/*
* controllers.js for telpirion.com.
* Copyright 2015, Eric M. Schmidt. All rights reserved.
*/

// The view model for the header.
function headerController($scope) {
    $scope.content =
    {
        title: "Telpirion.com",
        links: [
            { title: "Home", url: "#Home" },
            //{ title: "Resume", url: "#Resume" },
            { title: "Games", url: "#Games" },
            { title: "Apps", url: "#Apps"},
            //{ title: "Blog", url: "#Blog" },
            { title: "About", url: "#About" }
        ]
    };
}

// The viewmodel for the top-level scope.
function mainController($scope, $location) {

}

// The view model for the '#Home' page.
function homeController($scope) {

    var slideIndex = 0;
    var numSlides = document.querySelectorAll(".slide").length;

    setPositionIndicator();

    // Add event listeners to buttons on carousel.
    document.querySelector(".left").addEventListener("click",
        function () {
            updatePositionIndicator(-1);
            advanceSlide("l", function (newSlide, oldSlide, parent) {
                parent.insertBefore(newSlide, oldSlide);
            });
        });

    document.querySelector(".right").addEventListener("click",
        function(){
            updatePositionIndicator(1);
            advanceSlide("r", function (newSlide, oldSlide, parent) {
                parent.removeChild(oldSlide);
                parent.appendChild(oldSlide);
            });
        });

    // This is a bit of a hack. Should be able to remove the
    // last applied class in the transitionend event listener,
    // but that listener can't seem to remove the first-applied
    // classes.
    function removeAllAnimations(slides) {
        var animations = ["carousel-in-r", "carousel-out-r",
            "carousel-in-l", "carousel-out-l", "carousel-pre-fade"];

        for (var i = 0; i < slides.length; i++) {
            for (var j = 0; j < animations.length; j++){
                slides[i].classList.remove(animations[j]);
            }
        }
    }

    function advanceSlide(direction, fn) {
        var fadeout = "carousel-out-" + direction;
        var fadein = "carousel-in-" + direction;
        var prefade = "carousel-pre-fade";
        var slides = document.querySelectorAll(".slide");

        removeAllAnimations(slides);

        var oldSlide = slides[0],
            parentNode = oldSlide.parentNode,
            newSlide = (direction === "r") ?
                slides[1] :
                slides[slides.length - 1];

        var onTransitionEnd = function () {
            fn(newSlide, oldSlide, parentNode);
            newSlide.classList.add(fadein);
            oldSlide.removeEventListener("transitionend", onTransitionEnd);
        }

        // Begin animation
        oldSlide.addEventListener("transitionend", onTransitionEnd);
        newSlide.classList.add(prefade);
        oldSlide.classList.add(fadeout);
    }

    function setPositionIndicator() {
        var svgNS = "http://www.w3.org/2000/svg";
        var positionIndicator = document.querySelector(".position-indicator");
        var circle;

        for (var i = 0; i < numSlides; i++) {
            circle = document.createElementNS(svgNS, "circle");
            circle.setAttributeNS(null, "cx", 400 + (i * 20));
            circle.setAttributeNS(null, "cy", 10);
            circle.setAttributeNS(null, "r", 5);
            circle.setAttributeNS(null, "class", "position-circle");
            positionIndicator.appendChild(circle);
        }

        updatePositionIndicator(0);
    }

    function updatePositionIndicator(delta) {
        var tempIndex = slideIndex + delta;

        if (tempIndex >= numSlides) {
            tempIndex = 0;
        } else if (tempIndex < 0) {
            tempIndex = numSlides - 1;
        }

        slideIndex = tempIndex;
        document
            .querySelectorAll(".position-indicator circle")
            .forEach(function (element, index) {
                if (index == tempIndex) {
                    element.classList.remove("position-circle");
                    element.classList.add("position-current");
                } else {
                    element.classList.remove("position-current");
                    element.classList.add("position-circle");
                }
            });
    }
}

// The view model for the '#Games' page.
function gamesController($scope, $location) {
    $scope.title = "Games";
    $scope.gamesList = [
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
    $scope.title = "About";
    $scope.bodyContent = "Find general information about the games and apps on this site.";
    $scope.games = {
        title: "About the games"
    };
    $scope.apps = {
        title: "About the apps",
        content: "I have published a couple of apps on the Google Play Store and the Windows" +
        " Store."
    };
    $scope.contact = {
        title: "Contact me",
        mail: "eric.schmidt@telpirion.com"
    };
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
    .controller('mainController', ["$scope", "$location", mainController])
    .controller("headerController", headerController)
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