import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

export interface Game {
    title: string;
    subtitle: string;
    imgUrl: string;
    content: string;
    gameUrl: string;
    codeUrl: string;
}

@Component({
  selector: 'games',
  templateUrl: './games.ng.html',
  styleUrls: ['./games.ng.css']
})
export class GamesComponent {
  title : string = 'Games';
  content : string = 'I built these games entirely using HTML, CSS, and JavaScript with some art donated from friends.';
  games : Game[] = [
    {
        title: "Vikings!!!",
        subtitle: "Platformer",
        imgUrl: "images/vikings-promo.png",
        content: "Vikings!!! is a simple platformer. It uses a physics engine of my own design and code.",
        gameUrl: "/games/vikings/vikings.html",
        codeUrl: "https://github.com/telpirion/telpirion_com/tree/appengine/games/vikings/src"
    },
    {
        title: "Yahtzy",
        subtitle: "Dice",
        imgUrl: "images/yahtzy-promo.png",
        content: "Roll five dice and try to make three-of-a-kind, a full house, or even a Yahtzy!",
        gameUrl: "/games/yahtzy/yahtzy.html",
        codeUrl: "https://github.com/telpirion/telpirion_com/tree/appengine/games/yahtzy/src"
    },
    {
        title: "Conway's Game of Life",
        subtitle: "Puzzle",
        imgUrl: "images/conway-promo.png",
        content: "Build a colony of microbes that survives from one generation to the next.",
        gameUrl: "/games/conway/conway.html",
        codeUrl: "https://github.com/telpirion/telpirion_com/tree/appengine/games/conway/src"
    }
  ];

  constructor(private router: Router) {
    this.router = router;
  }

  playGame(game : Game) {
    console.log(`Play game: ${game.title}`);
    window.location.href = game.gameUrl;
  }

  viewCode(game : Game) {
    console.log(`View code: ${game.title}`);
    window.location.href = game.codeUrl;
  }
}