module Scratch.Services {

    export class TweetableService {
        public static $inject: string[] = [];

        constructor() {}

        public tryTweetable(protocol: string): boolean {
            var deeplink_url = protocol;
            window.location.href = deeplink_url;

            setTimeout(function () {
                var intent_url = "http://microsoft.com";
                window.open(intent_url, "_blank");
            }, 1250);
            return false;
        }
    }

    export class AppDetectionService {
        public static $inject: string[] = ["$rootScope", "$q", "deviceService"];

        private _$rootScope: ng.IRootScopeService;
        private _$q: ng.IQService;
        private _deviceService: DeviceService;
        private _browserType: BrowserType;
        private _redirectURL: string;

        constructor(
            $rootScope: ng.IRootScopeService,
            $q: ng.IQService,
            deviceService: DeviceService
        ) {
            this._$rootScope = $rootScope;
            this._$q = $q;
            this._deviceService = deviceService;
        }

        public isAppInstalledSync(protocol: string): boolean {
            var isSupported: boolean = false;

            return isSupported;
        }

        public isAppInstalledAsync(protocol: string, redirectUrl: string): ng.IPromise<boolean> {
            var deferred = this._$q.defer<boolean>();
            var deviceType: OSType = this._deviceService.getDevice();
            this._browserType = this._deviceService.getBrowser(deviceType);
            this._redirectURL = redirectUrl;

            if (navigator.msLaunchUri) {
                navigator.msLaunchUri(protocol,
                    () => { deferred.resolve(true); },
                    () => { deferred.resolve(false); })
            } else {
                this.tryProtocol(protocol)
                    .then((result) => {
                        deferred.resolve(result);
                    },
                    (err) => {
                        deferred.resolve(false);
                    });
            }

            return deferred.promise;
        }

        private tryProtocol(protocol: string): ng.IPromise<boolean> {
            var deferred = this._$q.defer<boolean>();

            switch (this._browserType) {
                case BrowserType.Chrome:
                    this.tryProtocolWithBlurAsync(protocol)
                        .then((result) => {
                            deferred.resolve(result);
                        },
                        (err) => {
                            deferred.resolve(false);
                        });
                    break;
                case BrowserType.Firefox:
                    deferred.resolve(this.tryProtocolAsError(protocol)); // Sync
                    break;
                case BrowserType.IE: // Older versions of IE.
                    this.tryProtocolInPopUp(protocol)
                        .then((result) => { 
                            deferred.resolve(result);
                        },
                        (err) => {
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
        }

        // Try the protocol directly, register a blur event that takes the user back 
        // to the current location
        private tryProtocolWithBlurSync(protocol: string): boolean {
            var currentLocation = window.location.href;
            var timer: number;

            window.onblur = () => {
                clearTimeout(timer);
                window.location.href = currentLocation;
            };
            
            window.location.href = protocol;

            timer = setTimeout(() => {
                window.location.href = this._redirectURL;
            }, 3000);
            return true;
        }

        // Try the protocol directly and set a timeout - Chrome.
        // Async
        private tryProtocolWithBlurAsync(protocol: string): ng.IPromise<boolean> {
            var deferred = this._$q.defer<boolean>();
            var timer: number;
            var handlerBlur = () => {
                clearTimeout(timer);
                window.removeEventListener("blur", handlerBlur);
                deferred.resolve(true);
            }

            window.addEventListener("blur", handlerBlur);

            window.location.href = protocol;

            timer = setTimeout(() => {
                deferred.resolve(false);
            }, 1250);

            return deferred.promise;
        }

        // Try the protocol as an error - Firefox.
        // Sync
        private tryProtocolAsError(protocol: string): boolean {
            var isProtocolSupported = true;
            try {
                var myFrame: HTMLIFrameElement = (<HTMLIFrameElement>document.createElement("iFrame"));
                myFrame.setAttribute("style", "width:0px;height:0px");
                document.body.appendChild(myFrame);

                myFrame.contentWindow.location.href = protocol;
            } catch (err) {
                if (err.name == "NS_ERROR_UNKNOWN_PROTOCOL") {
                    isProtocolSupported = false;
                }
            } finally {
                return isProtocolSupported;
            }
        }

        // Try the protocol in a pop-up window - IE 9 and lower.
        // Async
        private tryProtocolInPopUp(protocol: string): ng.IPromise<boolean> {
            var deferred = this._$q.defer();
            var myWindow = window.open('', '', 'width=0,height=0');
            var isSupported: boolean = false;
            myWindow.document.write("<iframe src='" + protocol + "></iframe>");

            setTimeout(function () {
                try {
                    myWindow.location.href;
                    isSupported = true;
                } catch (e) {
                    //Handle Exception
                }

                if (isSupported) {
                    myWindow.setTimeout('window.close()', 100);
                } else {
                    myWindow.close();
                }
            }, 100)
            return deferred.promise;
        }
    }

    export class DeviceService {
        public static $inject: string[] = ["$rootScope", "$q"];
        
        public rawBrowser: string;
        public rawVersion: string;
        public userAgent: string;
        public platform: string;
        public product: string;

        constructor(
            rootScope: ng.IRootScopeService
        ) {
            this.userAgent = navigator.userAgent.toLowerCase();
            this.platform = navigator.platform.toLowerCase();
            this.product = navigator.product;
        }

        public getBrowser(deviceType: OSType): BrowserType {
            var ua: string = navigator.userAgent.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua)
                || /(webkit)[ \/]([\w.]+)/.exec(ua)
                || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)
                || /(trident)/.exec(ua)
                || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)
                || [];

            var browser: string = match[1];
            var version: string = match[2];

            this.rawBrowser = browser;
            this.rawVersion = version;

            var browserType: BrowserType;
            if (browser === "trident") {
                browserType = BrowserType.IE;
            } else if (browser.indexOf("chrome") > -1) {
                browserType = BrowserType.Chrome;
            } else if (browser.indexOf("mozilla") > -1) {
                browserType = BrowserType.Firefox;
            } else if (browser.indexOf("webkit") > -1) {
                browserType = BrowserType.Safari;
            } else {
                browserType = BrowserType.Unknown;
            }

            return browserType;
        }

        public getDevice(): OSType {
            var platform: string = navigator.platform.toLowerCase();
            var appProtocol: string;
            var osType: OSType;

            var platformMatch = /(win32)/.exec(platform) ||
                /(iphone|ipad)/.exec(platform);

            if (platformMatch[0] === "win32") {
                appProtocol = "ms-windows-store://";
                osType = OSType.Windows;
            } else if (platformMatch[0] !== undefined) {
                appProtocol = "maps://";
                osType = OSType.iOS;
            } else {
                osType = OSType.Unknown;
            }
            return osType;
        }

    }

    angular.module("Scratch")
        .service("tweetableService", TweetableService)
        .service("appDetectionService", AppDetectionService)
        .service("deviceService", DeviceService);
} 