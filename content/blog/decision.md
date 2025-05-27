title: I made a decision!
description: 
    Behold, my new personal portfolio! Now with more Go, cleaner design, and
    server-side templating.
slug: decision-made
image: /images/decision-made.png
state: published
date: 2025-05-16
tags:
- Go

--------------------------------------------------------------------------------

I made my decision! Drum roll please ...

I decided to stick with the DIY spirit that I started my site with. The new
site is composed entirely of Go templates and some plain ol' HTML/CSS/JS. No
fancy frontend library. I found this great site, [html5up][html5up], that had 
several classy lookin' site designs that called to me. I picked the
"Editorial" theme because I like the clean lines, the orange accents, and the
"newspaper-y" feel.

In the end, I realized that I enjoy slinging Go code. It makes me happy. I'm
more likely to stay up-to-date with my site if I enjoy the process of updating.
I love the standard [Go templating library][go-template] with its rich
feature set. The [Gin web framework][gin] supplements pretty much all of the
rest of my needs.

To help facilitate my new bloginess, I've made a few key changes to my site
codebase:

+ I use [gomarkdown][gomd] for rendering my blog posts from Markdown to
  HTML. I like having the metadata for my posts embedded in the Markdown
  itself, so I've embedded the metadata as YAML front matter. Currently I need
  to parse this myself; hopefully I can find a library that will do this work
  for me.
+ I use [a Go library, minify,][minify] to compress
  my CSS and JS files used for the site (especially the JS games). Previously,
  I had used a pipe in my Gulp build script for minification. Now, I use
  the Go minify library to compress my JS files when the server starts up.
+ I composed the site almost entirely of Go HTML templates. Working from the
  Editorial html5up files, I've abstracted the nav, sidebar, header, landing
  pages, and list pages into Go templates.
+ I further decoupled the content of my site from its presentation. I've
  moved the site text into a series of JSON and YAML files. The Go server
  hydrates the HTML templates at serve time. This way I can update the content
  of my site without pouring over the site HTML. (Note: at some time in the
  future, I think I will move all of the content/data files to YAML format--it's
  just easier for me to read.)

Let's see how I did on meeting my original requirements:

+ [x] **Make it easier to post blog posts.** On the whole using `gomarkdown` to
  render my Markdown blog pages as HTML should make it easier for me to blog.
+ [x] **Use a single toolchain.** Of all requirements, the new site design
  really shines here. All I need is `go build .` and `go run .` to get my site 
  Go-ing. (Sorry, I couldn't resist the bad pun.)
+ [x] **Maintain and publish my JavaScript games.** This also is a big win,
  as I don't really need to change any code in my Go application to continue 
  serving the JS games. With that said, I did make some changes to improve
  the UX of the games and to host them in the site chrome.
+ [x] **Has a clean look and feel.** This template from html5up.net is exactly
  what I was looking for. I spent so much time pouring over paid, free,
  freemium, and highway robbery-priced templates available for TailwindCSS,
  Bootstrap, Astro, UIKite, Foundation, Hugo, and others. So many others. I 
  finally decided that I just needed something that looked nice and had a
  logical layout that I can expand on.
+ [x] **Allow for code reuse.** I can continue to use the cloudbuild.yaml and
  Dockerfile that I was already using for my site. I can reuse the JavaScript
  video games as-is. The rest of the content ... well, I have some migration to
  do.
+ [x] **Has a server-side component for me to tinker with.** Oh yeah. The
  fundamental Go & Gin web framework that I was using already isn't going
  anywhere. In fact, I'm doubling down!

Honestly, I haven't felt this much satisfaction or experienced as much "flow"
state in updating my personal portfolio site in a long time. I find myself
excited to continue building out new features, simplifying my code, and
posting my thoughts to this blog.

[gin]: https://gin-gonic.com/en/
[gomd]: https://pkg.go.dev/github.com/gomarkdown/markdown
[go-template]: https://pkg.go.dev/text/template
[html5up]: https://html5up.net/
[minify]: https://pkg.go.dev/github.com/tdewolff/minify