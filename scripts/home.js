/*
* home.js for telpirion.com.
* Copyright 2015, Eric M. Schmidt. All rights reserved.
*/
var telpirionApp = angular.module('telpirionApp', ["ngRoute"]);

// Routing for the pages inside of this site.
telpirionApp.config(["$routeProvider", "$locationProvider", 
    function($routeProvider, $locationProvider){
	
	// Shim to ease pain between development and deployment.
	console.log(location.href);
	var relativePath = (location.href.indexOf("google") > -1) ?
			"/telpirion/" : "";
	
	$routeProvider
    .when('/Home', {
        templateUrl: relativePath + 'templates/home.html',
        controller: 'homeController'
    })
    .when('/Games', {
    	templateUrl: relativePath + 'templates/games.html',
    	controller: 'gamesController'
    })
    .when('/Apps', {
        templateUrl: relativePath + 'templates/apps.html',
        controller: 'appsController'
    })
    .when('/Blog', {
    	templateUrl: relativePath + 'templates/blog.html',
    	controller: 'blogController'
    })
    .when('/About', {
    	templateUrl: relativePath + 'templates/about.html',
    	controller: 'aboutController'
    })
    .when('/Scratch', {
    	templateUrl: relativePath + 'templates/scratch.html',
    	controller: 'scratchController'
    })
    .when('/Games/Vikings', {
    	templateUrl: relativePath + 'templates/vikings.html',
    	controller: 'vikingsController'
    })
    .when('/Games/Yahtzee', {
    	templateUrl: relativePath + 'templates/yahtzee.html',
    	controller: 'yahtzeeController'
    })
    .otherwise('/Home');
}]);

// The view model for the site header navigation
telpirionApp.controller('headerController', function ($scope) {
	$scope.content = 
	{
		title: "Telpirion.com",
		links: [
			{ title: "Home", url: "#Home" },
			{ title: "Games", url: "#Games" },
            { title: "Apps", url: "#Apps"},
			{ title: "Blog", url: "#Blog" },
			{ title: "About", url: "#About" }
		]
	};
});

// The viewmodel for the top-level scope.
function mainController($scope, $location) {

}

// The main controller for the app.
telpirionApp.controller('mainController', ["$scope", "$location", mainController]);