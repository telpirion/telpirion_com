/*
* module.js for telpirion.com.
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
    .when('/Resume', {
        templateUrl: relativePath + 'templates/resume.html',
        controller: 'resumeController'
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
    .when('/Demo', {
        templateUrl: relativePath + 'templates/demo.html',
        controller: 'demoController'
    })
    .when('/Demo/Phaser', {
        templateUrl: relativePath + 'templates/phaser.html',
        controller: 'phaserController'
    })
    .when('/Games/Vikings', {
        templateUrl: relativePath + 'templates/vikings.html',
        controller: 'vikingsController'
    })
    .when('/Games/Yahtzy', {
        templateUrl: relativePath + 'templates/yahtzy.html',
        controller: 'yahtzyController'
    })
    .when('/Games/Conway', {
        templateUrl: relativePath + 'templates/conway.html',
        controller: 'conwayController'
    })
    .otherwise('/Home');
}]);
