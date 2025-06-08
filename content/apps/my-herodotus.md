Herodotus, often considered the ["Father of Historians,"][herodotus] was also a
prolific travel journalist. His Histories act as one of the very first travel
guides of the Ancient Mediterranean.

This project demonstrates how to create your own travel guide using 
[Gemini hosted on Google Cloud][gemini]--in effect, your very own Herodotus.

<a href="https://myherodotus-1025771077852.us-west1.run.app/" class="button">See the app</a>

## About

In 2024, my team in Google Cloud Developer Relations decided to set goals for
individual up-skilling. One of the projects
discussed was to create an AI-powered travel guide. I decided to pursue this
project and I themed my web app after Herodotus, the ancient Greek historian.

The My Herodotus app demonstrates many fundamentals of generative AI and
ML engineering. The app itself is written in Go with Gin as the web platform.
The frontend is built using plain HTML and some light JavaScript; Bulma.io is
used for the styling. Additional features are implemented as microservices:
evaluation, monitoring, embeddings/vector database, and even a Reddit tool
using agent.

## Attributions

* Gemini is a product published by Google.
* [Bulma.io][bulma] is a free, open-source framework for CSS. It is available
  under the [MIT license][mit-license].

## Details

* Current version: v1.7.0
* Compatible with all browsers
* Requires log-in with a Google account. (Why? It costs money to use Gemini and
  the other features of Google Cloud. I want to restrict access to serious
  inquiries only.)

## Features

* Provides a session-aware, back-and-forth conversation with an AI chatbot
* Gives travel recommendations based upon the user's input
* Provides multiple AI features, configurable by the user:

  + Use out-of-the-box Gemini model
  + Use a tuned Gemini model
  + Use a tuned Gemma model
  + Use a Gemini model assisted by an agent (using a Reddit tool)

+ Hosted on [Google Cloud Run][cloud-run]
+ Uses [Eventarc][eventarc] and [BigQuery][bigquery] for analytics
+ Uses [Cloud Logging][logging] for monitoring
+ Uses [Firebase][firebase] for authentication and login
+ Uses [Firestore][firestore] for storing embeddings

## Known issues

+ The Gemma model doesn't provide very good responses :/.
+ The vector database doesn't retrieve tokenized content correctly. 

[bigquery]: https://cloud.google.com/bigquery/
[bulma]: https://bulma.io/
[cloud-run]: https://cloud.google.com/run/
[eventarc]: https://cloud.google.com/eventarc/
[firebase]: https://firebase.google.com/
[firestore]: https://cloud.google.com/firestore/
[gemini]: https://cloud.google.com/products/gemini?hl=en
[herodotus]: https://en.wikipedia.org/wiki/Herodotus
[logging]: https://cloud.google.com/logging/
[mit-license]: https://opensource.org/licenses/mit-license.php
