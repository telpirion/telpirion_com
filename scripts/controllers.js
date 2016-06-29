/*
* controllers.js for telpirion.com.
* Copyright 2015, Eric M. Schmidt. All rights reserved.
*/

// The view model for the '#Home' page.
function homeController($scope) {
	$scope.news = "Current News";
	$scope.newsFeed = [
	{
		title: "Shamepile Software is now Telpirion.com",
		body: "This web site has been rebranded to Telpirion.com, the personal " +
				"web site for me, Eric M. Schmidt. Thank you for visiting the site!\n\n",
		date: "June 28, 2016"
	}];
}

// The view model for the '#Games' page.
function gamesController($scope) {
	$scope.title = "Games"; 
	$scope.games = [
	    { title: "Vikings!!!", url: "#/Games/Vikings", description: "About this game"},
	    { title: "Yahtzee", url: "#/Games/Yahtzee", description: "About this game" },
	    { title: "Modulus", url: "#/Games/Modulus", description: "About this game" }
	 ];
}

// The view model for the '#Apps' page
function appsController($scope) {
	$scope.title = "Apps";
}

// The view model for the '#Blog' page.
function blogController($scope) {
	$scope.title = "Blog";
	$scope.feed = [{
		title: "First blog post",
		date: "December 22, 2015",
		body: "First blog post on the new site!"
	}];
}

// The view model for the '#About' page.
function aboutController($scope) {
	$scope.title = "About";
	$scope.bodyContent = "Hello! Welcome to Telpirion.com, the personal website for Eric M. Schmidt.";
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

	// Add click handler to 
}

// The viewmodel for the "Vikings!!" game.
function vikingsController($scope) {
	$scope.title = "Vikings!!!";
	
	$.getScript("scripts/vikings/game.js");
}

// The viewmodel for the "Yahtzee" game page.
function yahtzeeController($scope) {
	$scope.title = "Yahtzee";
	
	$.when(
		$.getScript( "scripts/yahtzee/game.js"),
		$.getScript( "scripts/yahtzee/ui-controllers.js"),
		$.getScript( "scripts/yahtzee/robot.js" ),
		$.getScript( "scripts/yahtzee/utilities.js" ),
		$.Deferred(function( deferred ){
			$( deferred.resolve );
		})
	)
	.done(function(){
		console.log("yahtzee scripts loaded");
		$.getScript( "scripts/yahtzee/main.js" )
	});
}

// The viewmodel for the "Scratch" page.
function scratchController($scope, $location) {
	$scope.title = "Scratch";
	$scope.location = $location.absUrl();
}

telpirionApp
	.controller("homeController", homeController)
	.controller("gamesController", gamesController)
	.controller("appsController", appsController)
	.controller("blogController", blogController)
	.controller("aboutController", aboutController)
	.controller("vikingsController", vikingsController)
	.controller("yahtzeeController", yahtzeeController)
	.controller("scratchController", ["$scope", "$location", scratchController]);