module Scratch.Controllers {

    class ScratchController {
        public static $inject: string[] = ["$scope", "$rootScope", '$route', '$routeParams', '$location'];

        constructor(
            $scope: ScratchScope,
            $rootScope: ng.IRootScopeService,
            $route: ng.route.IRoute,
            $routeParams: ng.route.IRouteParamsService,
            $location: ng.ILocationService
        )  {
            $scope.$route = $route;
            $scope.$location = $location;
            $scope.$routeParams = $routeParams;
        }
    }

    class MenuController {
        public static $inject: string[] = ["$scope", "$rootScope", "$location"];

        constructor(
            $scope: MenuScope,
            $rootScope: ng.IRootScopeService,
            $location: ng.ILocationService
        ) {
            $scope.title = "Scratch directory";
        }
    }

    class DeviceController {
        public static $inject: string[] = ["$scope", "$rootScope", "$q", "appDetectionService", "tweetableService", "deviceService"];

        private _appDetectionService: Services.AppDetectionService;
        private _deviceService: Services.DeviceService;
        private _os: OSType;
        private _browser: BrowserType;

        constructor(
            $scope: DeviceScope,
            $rootScope: ng.IRootScopeService,
            $q: ng.IQService,
            appDetectionService: Services.AppDetectionService,
            tweetableService: Services.TweetableService,
            deviceService: Services.DeviceService
        ) {

            this._appDetectionService = appDetectionService;
            this._deviceService = deviceService;

            this._os = this._deviceService.getDevice();
            this._browser = this._deviceService.getBrowser(this._os);

            $scope.title = "Device and app detection";
            $scope.userAgent = this._deviceService.userAgent;
            $scope.platform = this._deviceService.platform
            $scope.product = this._deviceService.product;
            $scope.isSupported = "don't know";
            $scope.isInSameWindow = false;
            $scope.protocolToTry = this.getProtocolToTry(this._os);
            $scope.urlToRedirectTo = (this._os != OSType.Windows) ?
                "http://google.com" : "http://microsoft.com";

            $scope.browser = this._deviceService.rawBrowser;
            $scope.version = this._deviceService.rawVersion;
            
            $scope.openApp = () => {
                var protocol: string = $scope.protocolToTry;
                appDetectionService.isAppInstalledAsync(protocol, $scope.urlToRedirectTo)
                    .then((result) => {
                        $scope.isSupported = (<any>result).toString();
                        if (($scope.isSupported == "false") && $scope.isInSameWindow) {
                            window.location.href = $scope.urlToRedirectTo;
                        } else if ($scope.isSupported == "false") {
                            window.open($scope.urlToRedirectTo);
                        }
                    });
            }

            $scope.reset = () => {
                var deviceType: OSType = this._deviceService.getDevice();
                $scope.protocolToTry = this.getProtocolToTry(deviceType);
            }

            $scope.openAppTweetableJS = () => {
                tweetableService.tryTweetable($scope.protocolToTry);
            }
        }

        private getProtocolToTry(deviceType: OSType): string {  
            var protocol: string = "";

            if (deviceType == OSType.Windows) {
                protocol = "ms-windows-store://";
            } else if (deviceType == OSType.iOS) {
                protocol = "maps://";
            } else {
                protocol = "mailto://";
            }
            return protocol;
        }
    }

    class WinJSNGController {
        public static $inject: string[] = ["$scope"];

        constructor(
            $scope: WinJSNGScope
        ) {
            $scope.title = "WinJS controls as Angular directives"
        }
    }

    angular.module("Scratch")
        .controller("scratchController", ScratchController)
        .controller("menuController", MenuController)
        .controller("deviceController", DeviceController)
        .controller("winjsNgController", WinJSNGController);
} 