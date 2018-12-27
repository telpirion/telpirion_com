var Scratch;
(function (Scratch) {
    var Services;
    (function (Services) {
        var TweetableService = (function () {
            function TweetableService() {
            }
            TweetableService.prototype.tryTweetable = function (protocol) {
                var deeplink_url = protocol;
                window.location.href = deeplink_url;
                setTimeout(function () {
                    var intent_url = "http://microsoft.com";
                    window.open(intent_url, "_blank");
                }, 1250);
                return false;
            };
            TweetableService.$inject = [];
            return TweetableService;
        })();
        Services.TweetableService = TweetableService;
        var AppDetectionService = (function () {
            function AppDetectionService($rootScope, $q, deviceService) {
                this._$rootScope = $rootScope;
                this._$q = $q;
                this._deviceService = deviceService;
            }
            AppDetectionService.prototype.isAppInstalledSync = function (protocol) {
                var isSupported = false;
                return isSupported;
            };
            AppDetectionService.prototype.isAppInstalledAsync = function (protocol, redirectUrl) {
                var deferred = this._$q.defer();
                var deviceType = this._deviceService.getDevice();
                this._browserType = this._deviceService.getBrowser(deviceType);
                this._redirectURL = redirectUrl;
                if (navigator.msLaunchUri) {
                    navigator.msLaunchUri(protocol, function () { deferred.resolve(true); }, function () { deferred.resolve(false); });
                }
                else {
                    this.tryProtocol(protocol)
                        .then(function (result) {
                        deferred.resolve(result);
                    }, function (err) {
                        deferred.resolve(false);
                    });
                }
                return deferred.promise;
            };
            AppDetectionService.prototype.tryProtocol = function (protocol) {
                var deferred = this._$q.defer();
                switch (this._browserType) {
                    case BrowserType.Chrome:
                        this.tryProtocolWithBlurAsync(protocol)
                            .then(function (result) {
                            deferred.resolve(result);
                        }, function (err) {
                            deferred.resolve(false);
                        });
                        break;
                    case BrowserType.Firefox:
                        deferred.resolve(this.tryProtocolAsError(protocol)); // Sync
                        break;
                    case BrowserType.IE:
                        this.tryProtocolInPopUp(protocol)
                            .then(function (result) {
                            deferred.resolve(result);
                        }, function (err) {
                            deferred.resolve(false);
                        });
                        break;
                    case BrowserType.Safari:
                    case BrowserType.Opera:
                    case BrowserType.Unknown:
                    default:
                        deferred.resolve(this.tryProtocolWithBlurSync(protocol));
                }
                return deferred.promise;
            };
            // Try the protocol directly, register a blur event that takes the user back 
            // to the current location
            AppDetectionService.prototype.tryProtocolWithBlurSync = function (protocol) {
                var _this = this;
                var currentLocation = window.location.href;
                var timer;
                window.onblur = function () {
                    clearTimeout(timer);
                    window.location.href = currentLocation;
                };
                window.location.href = protocol;
                timer = setTimeout(function () {
                    window.location.href = _this._redirectURL;
                }, 3000);
                return true;
            };
            // Try the protocol directly and set a timeout - Chrome.
            // Async
            AppDetectionService.prototype.tryProtocolWithBlurAsync = function (protocol) {
                var deferred = this._$q.defer();
                var timer;
                var handlerBlur = function () {
                    clearTimeout(timer);
                    window.removeEventListener("blur", handlerBlur);
                    deferred.resolve(true);
                };
                window.addEventListener("blur", handlerBlur);
                window.location.href = protocol;
                timer = setTimeout(function () {
                    deferred.resolve(false);
                }, 1250);
                return deferred.promise;
            };
            // Try the protocol as an error - Firefox.
            // Sync
            AppDetectionService.prototype.tryProtocolAsError = function (protocol) {
                var isProtocolSupported = true;
                try {
                    var myFrame = document.createElement("iFrame");
                    myFrame.setAttribute("style", "width:0px;height:0px");
                    document.body.appendChild(myFrame);
                    myFrame.contentWindow.location.href = protocol;
                }
                catch (err) {
                    if (err.name == "NS_ERROR_UNKNOWN_PROTOCOL") {
                        isProtocolSupported = false;
                    }
                }
                finally {
                    return isProtocolSupported;
                }
            };
            // Try the protocol in a pop-up window - IE 9 and lower.
            // Async
            AppDetectionService.prototype.tryProtocolInPopUp = function (protocol) {
                var deferred = this._$q.defer();
                var myWindow = window.open('', '', 'width=0,height=0');
                var isSupported = false;
                myWindow.document.write("<iframe src='" + protocol + "></iframe>");
                setTimeout(function () {
                    try {
                        myWindow.location.href;
                        isSupported = true;
                    }
                    catch (e) {
                    }
                    if (isSupported) {
                        myWindow.setTimeout('window.close()', 100);
                    }
                    else {
                        myWindow.close();
                    }
                }, 100);
                return deferred.promise;
            };
            AppDetectionService.$inject = ["$rootScope", "$q", "deviceService"];
            return AppDetectionService;
        })();
        Services.AppDetectionService = AppDetectionService;
        var DeviceService = (function () {
            function DeviceService(rootScope) {
                this.userAgent = navigator.userAgent.toLowerCase();
                this.platform = navigator.platform.toLowerCase();
                this.product = navigator.product;
            }
            DeviceService.prototype.getBrowser = function (deviceType) {
                var ua = navigator.userAgent.toLowerCase();
                var match = /(chrome)[ \/]([\w.]+)/.exec(ua)
                    || /(webkit)[ \/]([\w.]+)/.exec(ua)
                    || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)
                    || /(trident)/.exec(ua)
                    || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)
                    || [];
                var browser = match[1];
                var version = match[2];
                this.rawBrowser = browser;
                this.rawVersion = version;
                var browserType;
                if (browser === "trident") {
                    browserType = BrowserType.IE;
                }
                else if (browser.indexOf("chrome") > -1) {
                    browserType = BrowserType.Chrome;
                }
                else if (browser.indexOf("mozilla") > -1) {
                    browserType = BrowserType.Firefox;
                }
                else if (browser.indexOf("webkit") > -1) {
                    browserType = BrowserType.Safari;
                }
                else {
                    browserType = BrowserType.Unknown;
                }
                return browserType;
            };
            DeviceService.prototype.getDevice = function () {
                var platform = navigator.platform.toLowerCase();
                var appProtocol;
                var osType;
                var platformMatch = /(win32)/.exec(platform) ||
                    /(iphone|ipad)/.exec(platform);
                if (platformMatch[0] === "win32") {
                    appProtocol = "ms-windows-store://";
                    osType = OSType.Windows;
                }
                else if (platformMatch[0] !== undefined) {
                    appProtocol = "maps://";
                    osType = OSType.iOS;
                }
                else {
                    osType = OSType.Unknown;
                }
                return osType;
            };
            DeviceService.$inject = ["$rootScope", "$q"];
            return DeviceService;
        })();
        Services.DeviceService = DeviceService;
        angular.module("Scratch")
            .service("tweetableService", TweetableService)
            .service("appDetectionService", AppDetectionService)
            .service("deviceService", DeviceService);
    })(Services = Scratch.Services || (Scratch.Services = {}));
})(Scratch || (Scratch = {}));
//# sourceMappingURL=ScratchServices.js.map