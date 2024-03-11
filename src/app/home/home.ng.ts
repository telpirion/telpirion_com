import { Component } from '@angular/core';
//import { MatButtonModule } from '@angular/material/button';
//import { MatCardModule } from '@angular/material/card';
//import { MatIconModule } from '@angular/material/icon';

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
  docSets: DocSet[] = [
    {
      title: "Vertex AI",
      url: "https://cloud.google.com/vertex-ai/docs"
    },
    {
      title: "Duet AI for Developers",
      url: "https://cloud.google.com/duet-ai/docs"
    },
    {
      title: "AutoML",
      url: "https://cloud.google.com/natural-language/automl/docs"
    },
    {
      title: "Cloud Translation",
      url: "https://cloud.google.com/translate/docs"
    },
    {
      title: "Cloud Natural Language",
      url: "https://cloud.google.com/natural-language/docs"
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