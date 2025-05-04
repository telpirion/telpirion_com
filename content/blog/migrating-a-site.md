title: Decisions are hard.
description: 
    Technical decisions are hard. When you have so many choices and n-number
    requirements ... it's hard to decide. Here I weigh the pros and cons of
    various site platforms.
slug: deciding-on-new-site-platform
state: unpublished
date: 2025-12-31
tags:
- Go
- Angular

--------------------------------------------------------------------------------

# Decisions, decisions

I'm having some "analysis paralysis": I want to update my personal website to
a more modern look & feel. However, I don't know which framework or platform to
choose!

I do have some fairly simple requirements for this choice:

+ The framework _must_ make it easier for me to publish blog posts (like this!)
  without much overhead.
+ The framework _must_ be able to host the HTML5/Javascript video games that
  I've coded.
+ The framework _should_ look nice and clean, with a modern design.
+ The framework _should_ have a single build system for front & backend.
+ The framework _should_ be easily containerized.
+ The framework _could_ allow for customization of the backend.
+ The framework _could_ make it easy to rewrite client-side URLs.
+ The framework _could_ allow for reuse of my existing components.

Even with all of these requirements in mind, I find myself a bit of a prisoner
to choices past.

## So much personal history

My personal site has had several major evolutions, usually inline with whatever
web technology I was learning at the time.

+ When I first started coding-as-an-adult, I was introduced to [SPA][spa] style
  sites and how to use HTML5 to power them. Hence, the first iteration of my
  personal site was a bare-bones, hand-coded SPA website, built with
  [Microsoft Expression Web][expression].

+ Next, I started learning some server-side coding. I decided to add my SPA
  content to an [MVC ASP.NET][mvc] application. I had a chance to tinker around
  with C#--so fun!

+ Then, I was introduced to some the frontend frameworks that were all the
  rage in the 2010s. After messing around with a couple, I settled on
  [Angular.js][ngjs].

+ After joining Google, I discovered that Angular.js was to be replaced by
  the "new" [Angular][ng] (aka Angular 2.0). I also learned about
  [Firebase static hosting][firebase]. I then constructed my new site in
  the new Angular, hosted on Firebase. I used Material components for the UI.

+ Later, I wanted to add some server-side functionality (again) to my site.
  This led me to build on [AppEngine][ae] with a Python [Flask][flask] backend.
  The Angular frontend I kept.

+ Finally, I started learning [Go][go]. I decided to swap out AppEngine for
  [Cloud Run][run] and also containerized my website. Joyous!

All this in the span of 14-ish years. Looking back, I've learned so much with
each evolution of this site.

## What to choose?

After chatting with my colleagues and kicking the tires on a few different
options, I've narrowed down my choices to the following:

+ [Astro][astro]
+ [Hugo][hugo]
+ [Docusaurus][docusaurus]
+ [Tailwind CSS][tailwind] with [React.js][react]

Each has their own pros and cons  ... which I will (of course) list below. This
is the internet, after all!

## Why not stick with Angular & Material?

I should explain briefly why I want to move away from Angular and Material, the
frontend framework that my site used pre-migration.

First off, I am lazy ... er, busy. I know that I am unlikely to keep my site
fresh and updated if I need to manage a lot of content. I'm already pretty
bad at it.

Following from the previous: I've allowed my site to fall behind the current
version of Angular by quite a lot. This has completely hindered my ability to
pass data between routes (as an example).

Besides, keeping this frontend would require that I keep the multi-build
process set up that I currently have, where I use Go (backend) and Node 
(frontend) for builds, with the two systems wired together by a Gulp file.

## Astro

A [colleague of mine][casey] recently updated his personal site to Astro, so it
comes highly recommended.

I like the focus on fast loading sites. It does look simple to get started and
it has a single build system.

However, I'm concerned about how well it will handle the JavaScript video games
that I've built. It seems like stripping out client-side scripting is a major
feature of Astro--this might not work for me.

Astro does have the concept of URL rewrites, but this feature is presented more
as a way of content reuse. I want to rewrite URLs so that my site uses
browser address bar-friendly URLs like "telpirion.com/games/blah" rather than
the name of the hosting service.

It looks like Astro offers themes, many of which are quite beautiful. There is
a mix of both paid and free themes.

Summary:

+ Blog posting: looks very easy
+ Hosting Javascript video games / interactive stuff: maybe hard to do
+ Looks nice & clean: lots of available templates
+ Single build system: yep
+ Easily containerized: looks like it; hard to tell
+ Customizable backend: yep
+ Rewrite URLs: maybe, not sure
+ Reuse of existing components: probably not


## Hugo

Another of my colleagues has his [his site on Hugo][marc] as does my
[tech lead][adam].

As a gopher, I am attracted to using my Go in my personal life. Hugo fits the
bill ... except that all of the "Go bits" are mostly obscured away. Oh well,
I guess you can't have everything.

Hugo also has a huge range of themes available, almost all of them free. I
really like how Hugo makes theme selection a part of the getting started
process.

_I think_ that Hugo will be able to host my Javascript games, so long as I
wrap them in one of the JS pipes that they expose. This will require more
research.

Like Astro, Hugo only requires a single build system, making it much easier
for me to build & deploy. However, the lack of server-side customization
options does feel a little limiting.

By default, Hugo tries to clean up "ugly" URLs, which is helpful. It's not clear
how much it will rewrite a URL.

Summary:

+ Blog posting: looks very easy
+ Hosting Javascript video games / interactive stuff: seems possible
+ Looks nice & clean: lots of available templates
+ Single build system: yep
+ Easily containerized: looks like it; hard to tell
+ Customizable backend: nope
+ Rewrite URLs: doesn't look like it
+ Reuse of existing components: probably not

## Docusaurus

Docusaurus seems to be growing quickly as a platform for documentation. I 
was introduced to it while working as a technical writer at a startup. I love
the ease-of-use of the system: writing plugins is simple; managing content is
straightforward; building the site is a breeze (provided that you're familiar)
with Node.js packages.

Plus, the Docusaurus mascot is super-cute (my wife even agrees).

Docusaurus does allow arbitrary Javascript (to a degree) and is requires only
a little set up. It can be used with just a single build system (node, babel
etc). 

The selection of themes is a bit sparse ... in fact, there's only one. It
is possible to design a set of CSS stylesheets for theming. That said, I'm
not much of a designer; I would rather rely on someone else's good design
sense.

Summary:

+ Blog posting: looks very easy
+ Hosting Javascript video games / interactive stuff: very doable
+ Looks nice & clean: default site is clean; need to find other themes
+ Single build system: yep
+ Easily containerized: yep
+ Customizable backend: nope
+ Rewrite URLs: yep
+ Reuse of existing components: almost certainly not



## Tailwind CSS with React.js

Finally, I could just continue the DIY spirit of my site by keeping the Go
backend that I have but replacing the Angular frontend with a Tailwind CSS
UI templates and React.js. 

The opportunities for code reuse is probably higher with this option. I
don't have to change my container code. The Go backend can probably stay much
the same.

However, selecting this option does require having two build systems, one for
the frontend and one for the backend. 

Furthermore, I would need to configure my routing in the React.js app. I would
need to wire up all the blogging bits and logic that other platforms just have.

Tailwind CSS has a lot of different themes that I can select from. It's not
entirely clear how to import them into my site.

Summary:

+ Blog posting: have to build in mechanics for blog posting
+ Hosting Javascript video games / interactive stuff: already done!
+ Looks nice & clean: would need to find a Tailwind theme to use
+ Single build system: nope
+ Easily containerized: yep
+ Customizable backend: yep
+ Rewrite URLs: not yet
+ Reuse of existing components: yep

## Conclusion
 

[_spa]: https://en.wikipedia.org/wiki/Single-page_application
[adam]: https://adamross.dev/
[ae]: https://cloud.google.com/appengine/docs
[astro]: https://astro.build/
[casey]: https://caseywest.com/ai-driven-development-modernizing-a-decade-old-website-in-3-days/
[docusaurus]: https://docusaurus.io/
[expression]: https://en.wikipedia.org/wiki/Microsoft_Expression_Web
[firebase]: https://firebase.google.com/docs/hosting
[flask]: https://palletsprojects.com/p/flask/
[go]: https://golang.org/
[hugo]: https://gohugo.io/
[marc]: https://www.marcdougherty.com/
[mvc]: https://dotnet.microsoft.com/en-us/apps/aspnet/mvc
[ngjs]: https://angularjs.org/
[ng]: https://angular.dev/
[run]: https://cloud.google.com/run
[spa]: https://developer.mozilla.org/en-US/docs/Glossary/SPA
[tailwind]: https://tailwindcss.com/
[react]: https://reactjs.org/]