import { Component, OnInit } from '@angular/core';

interface Sample {
    title: string;
    url: string;
    lang: string;
    technologies: string[];
};

@Component({
  selector: 'app-code-samples',
  templateUrl: './code-samples.component.html',
  styleUrls: ['./code-samples.component.css']
})
export class CodeSamplesComponent implements OnInit {
  title: string = 'Code samples';
  content: string = 'I have produced the following code samples and ' +
                    'demonstrations.';

  // TODO: Turn this into a GitHub API call?
  samples: Sample[] = [
    {
      title: 'Product Search samples',
      url: 'https://github.com/GoogleCloudPlatform/dotnet-docs-samples/pull/718',
      lang: 'C#',
      technologies: ['Google Cloud', 'Google Cloud Vision API']
    },
    {
      title: 'Speech transcription for Video Intelligence',
      url: 'https://github.com/GoogleCloudPlatform/dotnet-docs-samples/pull/711',
      lang: 'C#',
      technologies: ['Google Cloud', 'Google Cloud Video Intelligence API']
    },
    {
      title: 'Vision object localization',
      url: 'https://github.com/GoogleCloudPlatform/dotnet-docs-samples/pull/649',
      lang: 'C#',
      technologies: ['Google Cloud', 'Google Cloud Vision API']
    },
    {
      title: 'Speech-to-Text automatic punctuation, model selection',
      url: 'https://github.com/GoogleCloudPlatform/dotnet-docs-samples/pull/643',
      lang: 'C#',
      technologies: ['Google Cloud', 'Google Cloud Speech-to-Text API']
    },
    {
      title: 'Vision OCR sample',
      url: 'https://github.com/GoogleCloudPlatform/dotnet-docs-samples/pull/574',
      lang: 'C#',
      technologies: ['Google Cloud', 'Google Cloud Vision API']
    },
    {
      title: 'Text-to-Speech samples',
      url: 'https://github.com/GoogleCloudPlatform/dotnet-docs-samples/pull/573',
      lang: 'C#',
      technologies: ['Google Cloud', 'Google Cloud Text-to-Speech API']
    },
    {
      title: 'BigQuery load CSV sample',
      url: 'https://github.com/GoogleCloudPlatform/dotnet-docs-samples/pull/551',
      lang: 'C#',
      technologies: ['Google Cloud', 'Google Cloud BigQuery API']
    },
    {
      title: 'Hangouts Chat samples',
      url: 'https://github.com/gsuitedevs/hangouts-chat-samples/commit/28c2e33907b067052b42c8254e0f89cc706047fe#diff-93f725a07423fe1c889f448b33d21f46',
      lang: 'Java, Python',
      technologies: ['Google Hangouts Chat', 'Google Cloud', 'Google AppEngine']
    },
    {
      title: 'Hangouts Chat Apps Script codelab',
      url: 'https://github.com/googlecodelabs/hangouts-chat-apps-script/commit/f10cc5fb2966df19ded17480c438c7d0feec4b13',
      lang: 'JavaScript',
      technologies: ['Google Hangouts Chat', 'Google AppsScript']
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
