import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

interface App {
    title: string;
    url: string;
    description: string;
    img: string;
    icon: string;
    codeUrl: string;
};

@Component({
  selector: 'apps-page',
  templateUrl: './apps-page.ng.html',
  styleUrls: ['./apps-page.ng.css']
})
export class AppsPageComponent {
  title : string = 'Apps';
  content : string = 'I\'ve built the following apps for the Google Play ' +
                     'Store and the Windows Store.';
  apps : App[] = [{
            title: "Latin Reader for Android",
            url: "https://play.google.com/store/apps/details?id=com.ericmschmidt.latinreader",
            description: "Read one of several classical works in the original Latin " +
            "on your Android device.",
            img: "images/google-play-badge.png",
            icon: "",
            codeUrl: "https://github.com/telpirion/ClassicsReader/tree/master/LatinReader"
        }, {
            title: "Latin Reader for Windows",
            url: "https://www.microsoft.com/en-us/store/apps/latin-reader/9wzdncrfjjc0",
            description: "Read one of several classical works in the original Latin " +
            "on your Windows 10, Windows 8.1, or Windows Phone 8.1 device.",
            img: "https://assets.windowsphone.com/f2f77ec7-9ba9-4850-9ebe-77e366d08adc/English_Get_it_Win_10_InvariantCulture_Default.png",
            icon: "",
            codeUrl: "https://github.com/telpirion/ClassicsReader/tree/master/LatinReader-Windows"
        }];

    viewApp(app: App) {
        console.log(`View app: ${app.title}`);
        window.location.href = app.url;
    }

    viewCode(app: App) {
        console.log(`View code: ${app.title}`);
        window.location.href = app.codeUrl;
    }
}