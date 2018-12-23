///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="ModulusTypes.ts" />
///<reference path="ModulusResources.ts" />
var Modulus;
(function (Modulus) {
    var app = angular.module("Modulus", ["ngRoute", "winjs"]);
    var AppConfig = (function () {
        function AppConfig($routeProvider, $locationProvider) {
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
        AppConfig.$inject = ["$routeProvider", "$locationProvider"];
        return AppConfig;
    })();
    app.config(AppConfig);
})(Modulus || (Modulus = {}));
//# sourceMappingURL=Modulus.js.map