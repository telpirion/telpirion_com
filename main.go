/*
	  Main / server for Telpirion.com site.

	  @author Eric Schmidt
	  @version 2.0 2025/05/16
	  @copyright Eric Schmidt

	 	Routes in this application:
	 	/
		/about
		/apps
		/apps/[id]
		/blog
		/blog/[slug]
		/games
		/games/[id]
		/projects
		/publications
		/resume
*/
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	minify "github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/js"
	"github.com/telpirion/telpirion_com/internal"

	"github.com/gin-gonic/gin"
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
		Skills            []struct {
			Title       string `json:"title"`
			Description string `json:"description"`
			Icon        string `json:"icon"`
		}
	} `json:"home"`
}

var (
	uiStrings     UIStrings
	appsDict      = map[string]internal.ListItemMetadata{}
	blogsMetadata = []internal.BlogMetadata{}
	blogsDict     = map[string]internal.BlogMetadata{}
	gamesDict     = map[string]internal.GameMetadata{}
	projectsDict  = map[string]internal.ListItemMetadata{}
	pubsDict      = map[string]internal.ListItemMetadata{}
	logger        = log.Default()
)

func main() {

	setup()

	r := gin.Default()
	r.LoadHTMLGlob("./templates/*.html")
	r.Static("/assets", "./static")
	r.Static("/images", "./images")
	r.StaticFile("/favicon.ico", "./favicon.ico")

	r.GET("/home", homeHandler)
	r.GET("/", homeHandler)
	r.GET("/about", aboutHandler)
	r.GET("/apps", appsHandler)
	r.GET("/apps/:id", appHandler)
	r.GET("/blog", blogsHandler)
	r.GET("/blog/:slug", blogHandler)
	r.GET("/games", gamesHandler)
	r.GET("/games/:id", gameHandler)
	r.GET("/projects", projectsHandler)
	r.GET("/publications", publicationsHandler)
	r.GET("/resume", resumeHandler)

	r.NoRoute(func(c *gin.Context) {
		c.File("./src/index.html")
	})
	log.Fatal(r.Run(":8080"))
}

func setup() {
	// Read the text strings
	jsonFile, err := os.ReadFile("./content/strings.json")
	if err != nil {
		log.Fatal(err)
	}

	err = json.Unmarshal(jsonFile, &uiStrings)
	if err != nil {
		log.Fatal(err)
	}

	logger.Println("Reading blogs...")
	blogs, err := getBlogs("./content/blog")
	if err != nil {
		log.Fatal(err)
	}
	var tmpBlogs []internal.BlogMetadata
	for _, blog := range blogs {
		if strings.ToLower(blog.State) == "published" {
			tmpBlogs = append(tmpBlogs, blog)
		}
	}
	blogsMetadata = tmpBlogs

	logger.Println("Reading publications...")
	pubsDict, err = getJSONLItems("./content/publications/old.jsonl")
	if err != nil {
		log.Fatal(err)
	}

	logger.Println("Reading apps...")
	appsDict, err = getJSONLItems("./content/apps/old.jsonl")
	if err != nil {
		log.Fatal(err)
	}

	logger.Println("Reading projects...")
	projectsDict, err = getJSONLItems("./content/projects/old.jsonl")
	if err != nil {
		log.Fatal(err)
	}

	logger.Println("Reading games...")
	gamesDict, err = getGamesData("./content/games/manifest.jsonl")
	if err != nil {
		log.Fatal(err)
	}

	logger.Println("Minifying games...")
	minifyGames()
}

func homeHandler(c *gin.Context) {
	c.HTML(200, "index.html", gin.H{
		"Home":  uiStrings.Home,
		"Blogs": blogsMetadata[0:2],
	})
}

func aboutHandler(c *gin.Context) {

	md, err := os.ReadFile("./content/about.md")
	if err != nil {
		log.Fatal(err)
	}

	html := internal.Markdown(md)
	if err != nil {
		log.Fatal(err)
	}
	c.HTML(200, "markdown-info.html", gin.H{
		"Title":    "About",
		"Image":    "/images/telpirion-tree.png",
		"ImageAlt": "AI-generated image of Telperion, tree from the Silmarillion.",
		"Content":  template.HTML(string(html)),
	})
}

func appsHandler(c *gin.Context) {
	var appsSlice []internal.ListItemMetadata
	for _, item := range appsDict {
		appsSlice = append(appsSlice, item)
	}
	c.HTML(200, "list.html",
		gin.H{
			"Title":    "Apps",
			"Items":    appsSlice,
			"Position": "right",
			"View":     "View",
			"Code":     "Code",
		})
}

func appHandler(c *gin.Context) {
	id := c.Param("id")
	log.Println(id)
	app := appsDict[id]

	log.Println(app)

	c.HTML(200, "app.html", app)
}

func blogsHandler(c *gin.Context) {
	c.HTML(200, "blogs.html", gin.H{
		"Title":   "Blog",
		"Items":   blogsMetadata,
		"Subpath": "blog",
	})
}

func blogHandler(c *gin.Context) {

	id := c.Param("slug")
	log.Println(id)

	blog := blogsDict[id]

	md, err := os.ReadFile(blog.Filepath)
	if err != nil {
		log.Fatal(err)
	}

	html, metadata, err := internal.ParseBlog(md)
	if err != nil {
		log.Fatal(err)
	}

	c.HTML(200, "blog.html", gin.H{
		"Title":   metadata.Title,
		"Date":    metadata.Date,
		"Subpath": "blog",
		"Content": template.HTML(string(html)),
	})
}

func gamesHandler(c *gin.Context) {
	var gameSlice []internal.GameMetadata
	for _, item := range gamesDict {
		gameSlice = append(gameSlice, item)
	}

	c.HTML(200, "list.html", gin.H{
		"Title":    "Games",
		"Items":    gameSlice,
		"Position": "right",
		"View":     "Play",
		"Code":     "Code",
	})
}

func gameHandler(c *gin.Context) {
	id := c.Param("id")
	log.Println(id)
	game := gamesDict[id]

	html, err := os.ReadFile(game.HTML)
	if err != nil {
		log.Println(game.HTML)
		log.Fatal(err)
	}

	c.HTML(200, "game.html", gin.H{
		"Title":   game.Title,
		"Subpath": "games",
		"HTML":    template.HTML(string(html)),
		"JS":      fmt.Sprintf("/assets/js/%s.js", game.ID),
		"CSS":     fmt.Sprintf("/assets/css/%s.css", game.ID),
	})
}

func projectsHandler(c *gin.Context) {
	var projectsSlice []internal.ProjectMetadata
	for _, item := range projectsDict {
		proj := internal.ProjectMetadata{ListItemMetadata: item}
		projectsSlice = append(projectsSlice, proj)
	}

	c.HTML(200, "list.html", gin.H{
		"Title": "Projects",
		"Items": projectsSlice,
		"View":  "Code",
	})
}

func publicationsHandler(c *gin.Context) {
	var pubsSlice []internal.PublicationMetadata
	for _, item := range pubsDict {
		pub := internal.PublicationMetadata{ListItemMetadata: item}
		pubsSlice = append(pubsSlice, pub)
	}

	c.HTML(200, "list.html", gin.H{
		"Title": "Publications",
		"Items": pubsSlice,
		"View":  "Read",
	})
}

func resumeHandler(c *gin.Context) {
	md, err := os.ReadFile("./content/resume.md")
	if err != nil {
		log.Fatal(err)
	}

	html := internal.Markdown(md)
	if err != nil {
		log.Fatal(err)
	}
	c.HTML(200, "markdown-info.html", gin.H{
		"Title":    "Resume",
		"Image":    "/images/with-artemis.jpeg",
		"ImageAlt": "The very best daughter a dad can have.",
		"Content":  template.HTML(string(html)),
	})
}

func getBlogs(path string) ([]internal.BlogMetadata, error) {
	var blogs []internal.BlogMetadata

	err := filepath.Walk(path, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}

		fs, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		_, metadata, err := internal.ParseBlog(fs)
		if err != nil {
			return err
		}
		metadata.Filepath = path

		blogs = append(blogs, *metadata)
		blogsDict[metadata.Slug] = *metadata

		return nil
	})
	return blogs, err
}

func getJSONLItems(path string) (map[string]internal.ListItemMetadata, error) {

	var itemsDict = map[string]internal.ListItemMetadata{}
	fs, err := os.ReadFile(path)
	if err != nil {
		return itemsDict, err
	}

	itemStrs := strings.Split(string(fs), "\n")
	for _, pubStr := range itemStrs {
		if pubStr == "" {
			continue
		}

		item := internal.ListItemMetadata{}
		err = json.Unmarshal([]byte(pubStr), &item)
		if err != nil {
			return itemsDict, err
		}

		itemsDict[item.ID] = item
	}

	return itemsDict, nil
}

func getGamesData(path string) (map[string]internal.GameMetadata, error) {
	games := make(map[string]internal.GameMetadata)

	fs, err := os.ReadFile(path)
	if err != nil {
		return games, err
	}

	items := strings.Split(string(fs), "\n")
	for _, item := range items {
		if item == "" {
			continue
		}

		game := internal.GameMetadata{}
		err = json.Unmarshal([]byte(item), &game)
		if err != nil {
			return games, err
		}
		logger.Println(game.ID)

		games[game.ID] = game
	}
	return games, nil
}

func minifyGames() {
	extensions := []string{".js", ".css"}
	logger.Println("Start minifying games...")
	for _, root := range gamesDict {

		var buf bytes.Buffer
		m := minify.New()
		m.AddFuncRegexp(regexp.MustCompile("^(application|text)/(x-)?(java|ecma)script$"), js.Minify)

		logger.Println(root.JS)

		filepath.WalkDir(root.JS, func(path string, d os.DirEntry, err error) error {
			if err != nil {
				return err
			}
			if !d.IsDir() {
				for _, ext := range extensions {
					if strings.HasSuffix(path, ext) {
						log.Println(path)
						s, err := os.ReadFile(path)
						if err != nil {
							return err
						}
						buf.Write(s)
						buf.WriteString("\n")
					}
				}
			}
			return nil
		})
		var out bytes.Buffer
		jsPath := fmt.Sprintf("static/js/%s.js", root.ID)

		logger.Println("writing: " + jsPath)

		m.Minify("text/javascript", &out, bytes.NewReader(buf.Bytes()))
		os.WriteFile(jsPath, out.Bytes(), os.ModePerm)

		buf.Reset()

		cssPath := fmt.Sprintf("static/css/%s.css", root.ID)
		css, err := os.ReadFile(root.CSS)
		if err != nil {
			return
		}
		os.WriteFile(cssPath, css, os.ModePerm)

		htmlPath := fmt.Sprintf("static/html/%s.html", root.ID)
		html, err := os.ReadFile(root.HTML)
		if err != nil {
			return
		}
		os.WriteFile(htmlPath, html, os.ModePerm)
	}
}
