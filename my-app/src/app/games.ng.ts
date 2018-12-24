import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

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
  content = 'I built these games entirely using HTML, CSS, and JavaScript with some art donated form friends.';
  games : Game[] = [
    {
        title: "Vikings!!!",
        subtitle: "Platformer",
        imgUrl: "images/vikings-promo.png",
        content: "Vikings!!! is a simple platformer. It uses a physics engine of my own design and code.",
        gameUrl: "/games/vikings",
        codeUrl: "http://github.com/telpirion" //TODO
    },
    {
        title: "Yahtzy",
        subtitle: "Dice",
        imgUrl: "images/yahtzy-promo.png",
        content: "Roll five dice and try to make three-of-a-kind, a full house, or even a Yahtzy!",
        gameUrl: "/games/yahtzy",
        codeUrl: "http://github.com/telpirion" //TODO
    },
    {
        title: "Conway's Game of Life",
        subtitle: "Puzzle",
        imgUrl: "images/conway-promo.png", // TODO
        content: "Build a colony of microbes that survives from one generation to the next.",
        gameUrl: "/games/conway",
        codeUrl: "http://github.com/telpirion" //TODO
    }
  ];
}