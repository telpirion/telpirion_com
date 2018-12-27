///<reference path="../../Scripts/typings/angularjs/angular.d.ts" />
///<reference path="ScratchScope.ts" />
var Scratch;
(function (Scratch) {
    var app = angular.module("Scratch", ["ngRoute", "winjs"]);
    var AppConfig = (function () {
        function AppConfig($routeProvider, $locationProvider) {
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
        AppConfig.$inject = ["$routeProvider", "$locationProvider"];
        return AppConfig;
    })();
    app.config(AppConfig);
})(Scratch || (Scratch = {}));
//# sourceMappingURL=Scratch.js.map