title: Decisions are hard.
description: 
    Technical decisions are hard. When you have so many choices and n-number
    requirements ... it's hard to decide. Here I weigh the pros and cons of
    various site platforms.
slug: deciding-on-new-site-platform
image: /images/decisions-are-hard.png
state: published
date: 2025-05-09
tags:
- Go
- Angular

--------------------------------------------------------------------------------


I'm having some "analysis paralysis": I want to update my personal website to
a more modern look & feel. However, I don't know which framework or platform to
choose!

I do have some fairly simple requirements for this choice:

- The framework _must_ make it easier for me to publish blog posts (like this!)
  without much overhead.
- The framework _must_ be able to host the HTML5/Javascript video games that
  I've coded.
- The framework _should_ look nice and clean, with a modern design.
- The framework _should_ have a single build system for front & backend.
- The framework _should_ be easily containerized.
- The framework _could_ allow for customization of the backend.
- The framework _could_ make it easy to rewrite client-side URLs.
- The framework _could_ allow for reuse of my existing components.

Even with all of these requirements in mind, I find myself a bit of a prisoner
to choices past.

## So much personal history

My personal site has had several major evolutions, usually aligned with whatever
web technology I was learning at the time. Looking back, this site has had
the following iterations:

- When I first started coding-as-an-adult, I was introduced to [SPA][spa] style
  sites and how to use HTML5 to power them. Hence, the first iteration of my
  personal site was a bare-bones, hand-coded SPA website, built with
  [Microsoft Expression Web][expression].

- Next, I started learning some server-side coding. I decided to add my SPA
  content to an [MVC ASP. NET][mvc] application. I had a chance to tinker around
  with C#--so fun!

- Then, I was introduced to some the frontend frameworks that were all the
  rage in the 2010s. After messing around with jQuery and Knockout.js, I
  settled on [Angular.js][ngjs].

- After joining Google, I discovered that Angular.js was to be replaced by
  the "new" [Angular][ng] (aka Angular 2.0). I also learned about
  [Firebase static hosting][firebase]. I then constructed my new site in
  the new Angular, hosted on Firebase. I used Material components for the UI.

- Later, I wanted to add some server-side functionality (again) to my site.
  This led me to build on [AppEngine][ae] with a Python [Flask][flask] backend.
  The Angular frontend I kept.

- Finally, I started learning [Go][go]. I decided to swap out AppEngine for
  [Cloud Run][run] and also containerized my website. Joyous!

All this in the span of 14-ish years. Looking back, I've learned so much with
each evolution of this site.

## Why not stick with Angular & Material?

I should explain briefly why I want to move away from Angular and Material, the
frontend framework that my site used pre-migration.

First off, I am lazy ... er, busy. I know that I am unlikely to keep my site
fresh and updated if I need to manage a lot of content. I'm already pretty
bad at it.

Following from the previous: I've allowed my site to fall behind the current
version of Angular by quite a lot. This has completely hindered my ability to
pass data between routes (just as an example).

Besides, keeping this frontend would require that I keep the multi-build
process set up that I currently have, where I use Go (backend) and Node
(frontend) for builds, with the two systems wired together by a Gulp file.
Maintaining all three of these build systems required changes for even simple
updates to the site. While a complex site might need multiple build systems
for its components, mine is not that complicated.

## What to choose?

Despite the history, I want to make a clean(-ish) break. I must have better
capabilities for quick site updates (if I'm going to make a habit out of this
blog thing.

After chatting with my colleagues and kicking the tires on a few different
options, I've narrowed down my choices to the following:

- [Astro][astro]
- [Hugo][hugo]
- [Docusaurus][docusaurus]
- Plain, ol' CSS with a Go server

Each has their own pros and cons, which I will (of course) list below.
(The internet does love its lists!) Granted, many of the cons I've listed might 
be a result of me not finding what I need in the platform's documentation; that
is an issue in and of itself.

### Astro

A [colleague of mine][casey] recently updated his personal site to Astro, so it
comes highly recommended.

I like the focus on [fast loading sites][astro-fast]. It does look simple to get
started and it has a [single build system][astro-build].

Astro does have the concept of [URL rewrites][astro-rewrites]. I want to
rewrite URLs so that my site uses browser address bar-friendly URLs like
"telpirion.com/games/blah" rather than the name of the hosting service.

It looks like Astro offers [themes][astro-themes], many of which are quite beautiful. There is
a mix of both paid and free themes.

Summary:

- Blog posting: looks very easy
- Looks nice & clean: lots of available templates
- Single build system: yep
- Easily containerized: looks like it; hard to tell
- Customizable backend: yep
- Rewrite URLs: maybe, not sure
- Reuse of existing components: probably not

[astro]: https://astro.build/
[astro-fast]: https://docs.astro.build/en/concepts/why-astro/#server-first
[astro-build]: https://docs.astro.build/en/develop-and-build/#build-and-preview-your-site
[astro-rewrites]: https://docs.astro.build/en/reference/api-reference/#rewrite
[astro-themes]: https://astro.build/themes/

### Hugo

Another of my colleagues has his [his site on Hugo][marc] as does my
[tech lead][adam].

As a Gopher, I am attracted to using my Go in my personal life.
[Hugo fits the bill][hugo] ... except that all of the Go bits are mostly 
obscured away. Peeking at the [docs][hugo-docs], it looks like there are
some Go template directives here and there. Oh well, I guess you can't have
everything.

Hugo also has a [huge range of themes][hugo-themes] available, almost all of 
them free. I really like how Hugo makes theme selection a part of the 
[getting started process][hugo-gs].

**Side note**: While I was trying out Hugo, I ran into an [issue][hugo-issue]
where an update to their templating system broke a lot of the available themes.

_I think_ that Hugo will be able to host my Javascript games, so long as I
wrap them in one of the [JS pipes][hugo-js-pipe] that they expose. This will 
require more research.

Like Astro, Hugo only requires a [single build system][hugo-build], making it 
much easier for me to build & deploy. However, the lack of server-side 
customization options does feel a little limiting.

By default, Hugo tries to clean up ["ugly" URLs][hugo-rewrite], which is
helpful. It's not clear how much it will rewrite a URL to expose my vanity
domain name.

Summary:

- Blog posting: looks very easy
- Hosting Javascript video games / interactive stuff: seems possible
- Looks nice & clean: lots of available templates
- Single build system: yep
- Easily containerized: looks like it; hard to tell
- Customizable backend: nope
- Rewrite URLs: maybe?
- Reuse of existing components: probably not

[hugo-docs]: https://gohugo.io/documentation/
[hugo-themes]: https://themes.gohugo.io/
[hugo-gs]: https://gohugo.io/getting-started/quick-start/
[hugo-issue]: https://github.com/gohugoio/hugo/issues/13592
[hugo-js-pipe]: https://gohugo.io/functions/js/build/
[hugo-build]: https://gohugo.io/commands/hugo_build/
[hugo-rewrite]: https://gohugo.io/configuration/server/#redirects

### Docusaurus

Docusaurus seems to be growing quickly as a platform for documentation. I
was introduced to it while working as a technical writer at a startup. I love
the ease-of-use of the system: writing plugins is simple; managing content is
straightforward; building the site is a breeze (provided that you're familiar
with Node.js packages).

Plus, the [Docusaurus mascot is super-cute (my wife even agrees)][docusaurus-mascot].

Docusaurus [does allow arbitrary Javascript (to a degree)][docusaurus-plugins] 
and requires only a little set up. It can be used with just a
[single build system (Node, Babel, etc)][docusaurus-build].

The selection of official themes is a bit sparse ... in fact, 
[there's only one][docusaurus-themes]. It is possible to design a set of CSS 
stylesheets for theming and there is a rich ecosystem of third-party themes.
I'd rather not rely on my own design skills, so writing my own CSS is out; if I
pick this platform, I'd probably go with a third-party theme.

Summary:

- Blog posting: very easy
- Hosting Javascript video games / interactive stuff: probably doable
- Looks nice & clean: default site is clean; need to find other themes
- Single build system: yep
- Easily containerized: yep
- Customizable backend: kind of, with plugins
- Rewrite URLs: yep
- Reuse of existing components: almost certainly not

[docusaurus]: https://docusaurus.io/
[docusaurus-mascot]: https://github.com/facebook/docusaurus
[docusaurus-plugins]: https://docusaurus.io/docs/advanced/plugins
[docusaurus-build]: https://docusaurus.io/docs/installation#build
[docusaurus-themes]: https://docusaurus.io/docs/api/themes

## Go, Gin, and plain ol' HTML/CSS/JS

Finally, I could just continue the DIY spirit of my site by keeping the Go
backend that I have but replacing the Angular frontend with a some fancy
HTML & CSS. Maybe some JavaScript, too!

The opportunities for code reuse is probably higher with this option. I
don't have to change my container code. I could host my JavaScript games
as static assets. That said, I would need to define my routes and route
handling logic in the server. (Don't tempt me with a good time!)

(No, seriously -- it doesn't take much to convince me to write Go code.)

I would probably lean heavily on [Go templates][go-templates], which would
remove the need for multiple build systems. A simple `go build .` would be
all I need for the site. I would expand my reliance on [Gin][go-gin].

This option would force me to build my own blog server logic. That sounds like
a blast to me; however, building my own blog platform could seriously slow
down my time-to-deploy. Furthermore, I also take on all of the maintenance
burden for the platform.

Continuing the DIY path for the site means solving for style--I really do want
to upgrade the look & feel of my site. As I said earlier, I'm not much of a 
designer. Rather than writing my own CSS, though, I'm going to look around
to see whether there are some simple CSS styling templates that I can borrow. 

Summary:

- Blog posting: have to build in mechanics for blog posting
- Hosting JavaScript video games / interactive stuff: already done!
- Looks nice & clean: would need to find a open source, CSS theme to use
- Single build system: yep
- Easily containerized: yep
- Customizable backend: yep
- Rewrite URLs: yep
- Reuse of existing components: yep

[go-gin]: https://gin-gonic.com/en/
[go-templates]: https://pkg.go.dev/text/template

## Conclusion

If you're reading this, then you're already on the new site! To read more
about what I chose, see [the next post in this series](/blog/decision-made).

[_spa]: https://en.wikipedia.org/wiki/Single-page_application
[adam]: https://adamross.dev/
[ae]: https://cloud.google.com/appengine/docs
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
