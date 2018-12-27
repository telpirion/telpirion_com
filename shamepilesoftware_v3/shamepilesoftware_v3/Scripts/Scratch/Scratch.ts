///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="ScratchScope.ts" />
module Scratch {
    var app: ng.IModule = angular.module("Scratch", ["ngRoute", "winjs"]);

    class AppConfig {
        public static $inject: string[] = ["$routeProvider", "$locationProvider"];

        constructor(
            $routeProvider: ng.route.IRouteProvider,
            $locationProvider: ng.ILocationProvider
            ) {
            $routeProvider
                .when('/Menu', {
                    templateUrl: '../Scripts/Scratch/Templates/menu.html',
                    controller: 'menuController'
                })
                .when('/device', {
                    templateUrl: '../Scripts/Scratch/Templates/device.html',
                    controller: 'deviceController'
                })
                .when('/winjsNg', {
                    templateUrl: '../Scripts/Scratch/Templates/winjsNg.html',
                    controller: 'winjsNgController'
                })
                .otherwise('/Menu');
        }
    }

    app.config(AppConfig);
}
