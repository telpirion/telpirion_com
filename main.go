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
	"encoding/json"
	"html/template"
	"log"
	"os"
	"path/filepath"
	"strings"

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
	} `json:"home"`
	Blog struct {
		Title string `json:"title"`
	} `json:"blog"`
}

var (
	uiStrings     UIStrings
	appsDict      = map[string]internal.ListItemMetadata{}
	blogsMetadata = []internal.BlogMetadata{}
	blogsDict     = map[string]internal.BlogMetadata{}
	gamesDict     = map[string]internal.ListItemMetadata{}
	projectsDict  = map[string]internal.ListItemMetadata{}
	pubsDict      = map[string]internal.ListItemMetadata{}
	logger        = log.Default()
)

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("./templates/*.html")
	r.Static("/assets", "./static")
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

	logger.Println("Reading blogs...")
	blogs, err := getBlogs("./content/blog")
	if err != nil {
		log.Fatal(err)
	}
	blogsMetadata = blogs

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
	gamesDict, err = getJSONLItems("./content/games/manifest.jsonl")
	if err != nil {
		log.Fatal(err)
	}

	r.GET("/home", homeHandler)
	r.GET("/", homeHandler)
	r.GET("/about", aboutHandler)
	r.GET("/apps", appsHandler)
	r.GET("/apps/:id", appHandler)
	r.GET("/blog", blogsHandler)
	r.GET("/blog/:slug", blogHandler)
	r.GET("/games", gamesHandler)
	r.GET("/projects", projectsHandler)
	r.GET("/publications", publicationsHandler)
	r.GET("/resume", resumeHandler)

	r.NoRoute(func(c *gin.Context) {
		c.File("./src/index.html")
	})
	log.Fatal(r.Run(":8080"))
}

func homeHandler(c *gin.Context) {
	c.HTML(200, "index.html", uiStrings)
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
		"Title": "Blog",
		"Items": blogsMetadata,
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
	var gameSlice []internal.ListItemMetadata
	for _, item := range gamesDict {
		gameSlice = append(gameSlice, item)
	}

	c.HTML(200, "list.html", gin.H{
		"Title":    "Games",
		"Items":    gameSlice,
		"Position": "right",
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
