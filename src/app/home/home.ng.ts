import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

interface DocSet {
  title: string;
  url: string;
};

@Component({
  selector: 'home',
  templateUrl: './home.ng.html',
  styleUrls: ['./home.ng.css']
})
export class HomeComponent {
  title: string = 'Eric\'s awesome Angular site';
  docSets: DocSet[] = [
    {
      title: "Cloud Translation",
      url: "https://cloud.google.com/translate/docs"
    },
    {
      title: "Cloud Natural Language",
      url: "https://cloud.google.com/natural-language/docs"
    },
    {
      title: "AutoML",
      url: "https://cloud.google.com/natural-language/automl/docs"
    },
    {
      title: "Document AI",
      url: "https://cloud.google.com/document-ai/docs"
    },
    {
      title: "Cloud Speech-to-Text",
      url: "https://cloud.google.com/speech-to-text/docs"
    },
    {
      title: "Cloud Text-to-Speech",
      url: "https://cloud.google.com/text-to-speech/docs"
    },
    {
      title: "Cloud Video Intelligence",
      url: "https://cloud.google.com/video-intelligence/docs"
    }
  ];
}