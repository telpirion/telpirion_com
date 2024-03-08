import { Component, OnInit } from '@angular/core';

interface Publication {
    title: string;
    host: string;
    blurb: string;
    url: string;
    date: string;
};

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  title: string = 'Publications';
  content: string = 'I have written articles and documentation ' +
                    'for the following publications and sites.';

  published: Publication[] = [
    {
        title: "Build More Efficient Windows Store Apps Using JavaScript: Performance",
        host: "MSDN Magazine",
        blurb: "This article examines several techniques for improving a Windows" +
               "Store app’s performance, focusing on memory usage and HTML UI responsiveness.",
        url: "http://msdn.microsoft.com/en-us/magazine/dn574803.aspx",
        date: "February 2014"
    },
    {
        title: "Build More Efficient Windows Store Apps Using JavaScript: Error Handling",
        host: "MSDN Magazine",
        blurb: "This article looks at best practices for error handling using the" +
               "Windows Library for JavaScript (WinJS).",
        url: "http://msdn.microsoft.com/en-us/magazine/dn519922.aspx",
        date: "January 2014"
    },
    {
        title: "Exploring the JavaScript API for Office: Data Binding and Custom XML Parts",
        host: "MSDN Magazine",
        blurb: "This article examines key aspects of the API, focusing on data" +
               "binding and support for working with custom XML parts.",
        url: "http://msdn.microsoft.com/en-us/magazine/dn166930.aspx",
        date: "April 2013"
    },
    {
        title: "Exploring the JavaScript API for Office: Data Access and Events",
        host: "MSDN Magazine",
        blurb: "This article provides a detailed walk-through on how to access" +
               "file content and a review of the event model.",
        url: "http://msdn.microsoft.com/en-us/magazine/jj991976.aspx",
        date: "March 2013"
    },
    {
        title: "Exploring the New JavaScript API for Office (Part 1)",
        host: "MSDN Magazine",
        blurb: "This article is the first in a series of in-depth looks at the" +
               "JavaScript API for Office, introduced in Microsoft Office 2013.",
        url: "http://msdn.microsoft.com/en-us/magazine/jj891014.aspx",
        date: "February 2013"
    },
  ];

  view(pub : Publication) {
    console.log(`View publication: ${pub.title}`);
    window.location.href = pub.url;
  }

  constructor() {}

  ngOnInit() {}
}
