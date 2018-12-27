interface ScratchScope extends ng.IScope {
    $route: ng.route.IRoute;
    $location: ng.ILocationService;
    $routeParams: ng.route.IRouteParamsService;
}

interface MenuScope extends ng.IScope {
    title: string;
}

interface DeviceScope extends ng.IScope {
    title: string;
    userAgent: string;
    platform: string;
    product: string;
    browser: string;
    version: string;
    protocolToTry: string;
    urlToRedirectTo: string;
    isInSameWindow: boolean;
    isSupported: string;
    openApp: () => void;
    reset: () => void;
    openAppTweetableJS: () => void;
}

interface WinJSNGScope extends ng.IScope {
    title: string;
}

enum OSType {
    Windows,
    iOS,
    OSX,
    Android,
    Blackberry,
    Unknown
}

enum BrowserType {
    Chrome,
    IE,
    Firefox,
    Safari,
    Opera,
    Unknown
}
