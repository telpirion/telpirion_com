///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="ModulusTypes.ts" />
///<reference path="ModulusResources.ts" />
module Modulus {
    var app: ng.IModule = angular.module("Modulus", ["ngRoute", "winjs"]);

    class AppConfig {
        public static $inject: string[] = ["$routeProvider", "$locationProvider"];

        constructor(
            $routeProvider: ng.route.IRouteProvider,
            $locationProvider: ng.ILocationProvider
        ) {
            $routeProvider
                .when('/Menu', {
                    templateUrl: '../Scripts/Modulus/Templates/Menu/menu.html',
                    controller: 'menuController'
                })
                .when("/characterSelect", {
                    templateUrl: "../Scripts/Modulus/Templates/CharacterSelect/characterSelect.html",
                    controller: "characterSelectController"
                })
                .when('/Game', {
                    templateUrl: '../Scripts/Modulus/Templates/Game/game.html',
                    controller: 'gameController'
                })
                .when("/Levels", {
                    templateUrl: "../Scripts/Modulus/Templates/Levels/levels.html",
                    controller: "levelsController"
                })
                .when('/Character', {
                    templateUrl: '../Scripts/Modulus/Templates/Character/character.html',
                    controller: 'characterController'
                })
                .otherwise('/Menu');
        }
    }

    app.config(AppConfig);
}
