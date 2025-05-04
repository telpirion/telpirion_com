# My first new blog post!

I made my decision! Drum roll please ...

I decided to stick with Go templates and embrace some plain ol' CSS and HTML.
I found this great site, [html5up][html5up], that had the classy lookin' site
design that called to me. This site design.

In the end, I enjoy slinging Go code. It makes me happy. I enjoy the templating
engine and I love working with Gin.

To help facilitate my new bloginess, I've made a few key changes to my site
codebase:

+ I'm using [gomarkdown][gomd] for rendering my blog posts from Markdown to
  HTML.
+ I'm using [minify][https://pkg.go.dev/github.com/tdewolff/Minify] to compress
  my CSS and JS files used for the site (especially the JS games).

Let's see how I did on meeting my original requirements:

+ [x] **Make it easier to post blog posts.** On the whole using `gomarkdown` to
  render my Markdown blog pages as HTML should make it easier for me to blog.
+ [x] **Use a single toolchain.** Of all requirements, the new site design
  really shines here. All I need is `go run .` to get my site going.
+ [x] **Maintain and publish my JavaScript games.** This also is a big win,
  as I don't really need to change any in my Go application to continue serving
  the JS games. (I will make changes, of course, but that is what it is.)
+ [x] **Has a clean look and feel.** This template from html5up.net is exactly
  what I was looking for. I spent so much time, pouring over paid, free,
  freemium, and highway robbery priced templates available for TailwindCSS,
  Bootstrap, Astro, UIKite, Foundation, and others. So many others. I finally
  decided that I just needed something that looked nice and had a logical place
  for me to publish blog posts.
+ [x] **Allow for code reuse.** I can continue to use the cloudbuild.yaml and
  Dockerfile that I was already using for my site. I can reuse the JavaScript
  video games as-is. The rest of the content ... well, I have some migration to
  do.
+ [x] **Has a server-side component for me to tinker with.** Oh yeah. The
  fundamental Go & Gin web framework that I was using already isn't going
  anywhere. In fact, I'm doubling down!


[gomd]: https://pkg.go.dev/github.com/gomarkdown/markdown
[html5up]: https://html5up.net/
[minify]: https://pkg.go.dev/github.com/tdewolff/minify