import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

interface Link {
    label: string;
    url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title : string = "Telpirion.com";

    links : Link[] = [
        {
            label: "Home",
            url: "/home"
        },{
            label: "Games",
            url: "/games"
        }, {
            label: "Apps",
            url: "/apps"
        }, {
            label: "About",
            url: "/about"
        }
    ];

    ngOnInit() {

    }
}
