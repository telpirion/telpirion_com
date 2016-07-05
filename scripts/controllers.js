/*
* controllers.js for telpirion.com.
* Copyright 2015, Eric M. Schmidt. All rights reserved.
*/

// The view model for the '#Home' page.
function homeController($scope) {
	$scope.greetingsContent = [
	{
		html: "Welcome to the professional and personal website for me, Eric " +
		"M. Schmidt. Hi!"
	}, {
		html: "Check out the JavaScript and HTML5 video games " +
			"published on the site. I programmed all of the video games " +
			"myself (excluding external libraries). Some art in the games " +
			"was donated by friends."
	}];
}

// The view model for the '#Games' page.
function gamesController($scope) {
	$scope.title = "Games";
	$scope.games = [
	    {
	    	title: "Vikings!!!",
	    	url: "#/Games/Vikings",
	    	description: "About this game"
	    },
	    {
	    	title: "Yahtzy",
	    	url: "#/Games/Yahtzy",
	    	description: "About this game"
	    },
	    {
	    	title: "Modulus",
	    	url: "#/Games/Modulus",
	    	description: "About this game"
	    }
	 ];
}

// The view model for the '#Apps' page
function resumeController($scope) {
	$scope.title = "Resume";
}

// The view model for the '#Apps' page
function appsController($scope) {
	$scope.title = "Apps";

	$scope.appsList = [
		{
			title: "Latin Reader for Android",
			url: "https://play.google.com/store/apps/details?id=com.ericmschmidt.latinreader",
			about: "Read one of several classical works in the original Latin " +
			"on your Android device."
		}, {
			title: "Latin Reader for Windows",
			url: "https://www.microsoft.com/en-us/store/apps/latin-reader/9wzdncrfjjc0",
			about: "Read one of several classical works in the original Latin " +
			"on your Windows 10, Windows 8.1, or Windows Phone 8.1 device."
		}
	];
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
	$scope.bodyContent = "Find information about the games and apps on this site.";
	$scope.gamesExpando = "About the games";
	$scope.appsExpando = "About the apps";
	$scope.appsBodyContent = "I have published a couple of apps on the Google Play Store and the Windows" +
		" Store.";
	$scope.contactExpando = "Contact me";
	$scope.contactMail = "admin@telpirion.com";

	// Wire up the expandos.
	$(".expando").click(function(evt){
        var heading = evt.target.nodeName.toLowerCase() == "span" ?
                evt.target.parentElement : evt.target;

            var sectionContent = heading.nextElementSibling;
            var nextSection = sectionContent.parentElement.nextElementSibling;

            if (sectionContent.classList.contains("hidden")) { // Expand
                $(heading).children(".icon").text("-");

                sectionContent.classList.remove("hidden");
                sectionContent.classList.add("shown");

            } else { // Collapse
                $(heading).children(".icon").text("+");

                sectionContent.classList.remove("shown");
                sectionContent.classList.add("hidden");
            }
	});

}

// The viewmodel for the "Vikings!!" game.
function vikingsController($scope) {
	$scope.title = "Vikings!!!";
	$.getScript("scripts/vikings/game.js");
}

// The viewmodel for the "Yahtzy" game page.
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

// The viewmodel for the "Scratch" page.
function scratchController($scope, $location) {
	$scope.title = "Scratch";
	$scope.location = $location.absUrl();
}

telpirionApp
	.controller("homeController", homeController)
	.controller("resumeController", resumeController)
	.controller("gamesController", gamesController)
	.controller("appsController", appsController)
	.controller("blogController", blogController)
	.controller("aboutController", aboutController)
	.controller("vikingsController", vikingsController)
	.controller("yahtzyController", yahtzyController)
	.controller("scratchController", ["$scope", "$location", scratchController]);