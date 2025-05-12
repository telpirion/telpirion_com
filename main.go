/**
 * Main / server for Telpirion.com site.
 *
 * @author Eric Schmidt
 * @version 1.0 2024/03/07
 * @copyright Eric Schmidt
 */
package main

import (
	"encoding/json"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
)

type UIStrings struct {
	Title string `json:"title"`
	Home  struct {
		Title             string `json:"title,omitempty"`
		Hello             string `json:"hello"`
		Subtitle          string `json:"subtitle"`
		SubtitleContinued string `json:"subtitleContinued"`
		AboutMe           string `json:"aboutMe"`
		HeroImageSrc      string `json:"heroImageSrc"`
		HeroImageAlt      string `json:"heroImageAlt"`
	} `json:"home"`
	Blog struct {
		Title string `json:"title"`
	} `json:"blog"`
}

var uiStrings UIStrings

/**
Routes to define:

/
/about
/apps
/apps/latin-reader-android
/apps/latin-reader-windows
/apps/my-herodotus
/blog
/blog/[slug]
/games/vikings
/games/yahtzy
/games/conway
/projects
/publications
*/

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("src/*.html")
	r.Static("/assets", "./src/assets")
	r.Static("/images", "./images")
	//r.Static("/css", "../site/css")
	r.StaticFile("/favicon.ico", "./favicon.ico")

	// Read the text strings
	jsonFile, err := os.ReadFile("./content/strings.json")
	if err != nil {
		log.Fatal(err)
	}

	err = json.Unmarshal(jsonFile, &uiStrings)
	if err != nil {
		log.Fatal(err)
	}

	r.GET("/home", homeHandler)
	r.GET("/", homeHandler)
	r.GET("/blog", blogHandler)

	r.NoRoute(func(c *gin.Context) {
		c.File("./src/index.html")
	})
	log.Fatal(r.Run(":8080"))
}

func homeHandler(c *gin.Context) {
	c.HTML(200, "index.html", uiStrings)
}

func blogHandler(c *gin.Context) {

	md, err := os.ReadFile("./content/blog.md")
	if err != nil {
		log.Fatal(err)
	}
	html := mdToHTML(md)

	c.Data(200, "text/html; charset=utf-8", html)
}

func mdToHTML(md []byte) []byte {
	// create markdown parser with extensions
	extensions := parser.CommonExtensions | parser.AutoHeadingIDs | parser.NoEmptyLineBeforeBlock | parser.Mmark
	p := parser.NewWithExtensions(extensions)
	doc := p.Parse(md)

	// create HTML renderer with extensions
	htmlFlags := html.CommonFlags | html.HrefTargetBlank
	opts := html.RendererOptions{Flags: htmlFlags}
	renderer := html.NewRenderer(opts)

	return markdown.Render(doc, renderer)
}
