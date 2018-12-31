import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface Link {
    label: string;
    url: string;
    icon: string;
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
            url: "/home",
            icon: "home"
        },{
            label: "Games",
            url: "/games",
            icon: "games"
        }, {
            label: "Apps",
            url: "/apps",
            icon: "apps"
        }, {
            label: "Publications",
            url: "/publications",
            icon: "description"
        }, {
            label: "Code samples",
            url: "/code-samples",
            icon: "code"
        }, {
            label: "About",
            url: "/about",
            icon: "help"
        }
    ];

    constructor(private router: Router) {
        this.router = router;
    }

    ngOnInit() {
    }

    onHeaderClick() {
        console.log("header clicked!");
    }

}
