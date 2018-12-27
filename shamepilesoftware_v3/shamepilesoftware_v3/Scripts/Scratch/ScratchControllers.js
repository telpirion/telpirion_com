var Scratch;
(function (Scratch) {
    var Controllers;
    (function (Controllers) {
        var ScratchController = (function () {
            function ScratchController($scope, $rootScope, $route, $routeParams, $location) {
                $scope.$route = $route;
                $scope.$location = $location;
                $scope.$routeParams = $routeParams;
            }
            ScratchController.$inject = ["$scope", "$rootScope", '$route', '$routeParams', '$location'];
            return ScratchController;
        })();
        var MenuController = (function () {
            function MenuController($scope, $rootScope, $location) {
                $scope.title = "Scratch directory";
            }
            MenuController.$inject = ["$scope", "$rootScope", "$location"];
            return MenuController;
        })();
        var DeviceController = (function () {
            function DeviceController($scope, $rootScope, $q, appDetectionService, tweetableService, deviceService) {
                var _this = this;
                this._appDetectionService = appDetectionService;
                this._deviceService = deviceService;
                this._os = this._deviceService.getDevice();
                this._browser = this._deviceService.getBrowser(this._os);
                $scope.title = "Device and app detection";
                $scope.userAgent = this._deviceService.userAgent;
                $scope.platform = this._deviceService.platform;
                $scope.product = this._deviceService.product;
                $scope.isSupported = "don't know";
                $scope.isInSameWindow = false;
                $scope.protocolToTry = this.getProtocolToTry(this._os);
                $scope.urlToRedirectTo = (this._os != OSType.Windows) ?
                    "http://google.com" : "http://microsoft.com";
                $scope.browser = this._deviceService.rawBrowser;
                $scope.version = this._deviceService.rawVersion;
                $scope.openApp = function () {
                    var protocol = $scope.protocolToTry;
                    appDetectionService.isAppInstalledAsync(protocol, $scope.urlToRedirectTo)
                        .then(function (result) {
                        $scope.isSupported = result.toString();
                        if (($scope.isSupported == "false") && $scope.isInSameWindow) {
                            window.location.href = $scope.urlToRedirectTo;
                        }
                        else if ($scope.isSupported == "false") {
                            window.open($scope.urlToRedirectTo);
                        }
                    });
                };
                $scope.reset = function () {
                    var deviceType = _this._deviceService.getDevice();
                    $scope.protocolToTry = _this.getProtocolToTry(deviceType);
                };
                $scope.openAppTweetableJS = function () {
                    tweetableService.tryTweetable($scope.protocolToTry);
                };
            }
            DeviceController.prototype.getProtocolToTry = function (deviceType) {
                var protocol = "";
                if (deviceType == OSType.Windows) {
                    protocol = "ms-windows-store://";
                }
                else if (deviceType == OSType.iOS) {
                    protocol = "maps://";
                }
                else {
                    protocol = "mailto://";
                }
                return protocol;
            };
            DeviceController.$inject = ["$scope", "$rootScope", "$q", "appDetectionService", "tweetableService", "deviceService"];
            return DeviceController;
        })();
        var WinJSNGController = (function () {
            function WinJSNGController($scope) {
                $scope.title = "WinJS controls as Angular directives";
            }
            WinJSNGController.$inject = ["$scope"];
            return WinJSNGController;
        })();
        angular.module("Scratch")
            .controller("scratchController", ScratchController)
            .controller("menuController", MenuController)
            .controller("deviceController", DeviceController)
            .controller("winjsNgController", WinJSNGController);
    })(Controllers = Scratch.Controllers || (Scratch.Controllers = {}));
})(Scratch || (Scratch = {}));
//# sourceMappingURL=ScratchControllers.js.map