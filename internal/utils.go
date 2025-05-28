package internal

import (
	"encoding/json"
	"strings"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
	"gopkg.in/yaml.v2"
)

func ParseBlog(md []byte) (string, *BlogMetadata, error) {
	parts := strings.Split(string(md), separator)

	html := Markdown([]byte(parts[1]))
	metadata := BlogMetadata{}
	err := yaml.Unmarshal([]byte(parts[0]), &metadata)
	if err != nil {
		return "", nil, err
	}
	return string(html), &metadata, nil
}

func ParsePublication(pub string) ([]PublicationMetadata, error) {
	var publications []PublicationMetadata

	err := json.Unmarshal([]byte(pub), &publications)
	if err != nil {
		return nil, err
	}

	return publications, nil
}

func Markdown(md []byte) []byte {
	// Create markdown parser with extensions
	extensions := parser.CommonExtensions | parser.AutoHeadingIDs | parser.NoEmptyLineBeforeBlock | parser.Mmark
	p := parser.NewWithExtensions(extensions)
	doc := p.Parse(md)

	// Create HTML renderer with extensions
	htmlFlags := html.CommonFlags | html.HrefTargetBlank
	opts := html.RendererOptions{Flags: htmlFlags}
	renderer := html.NewRenderer(opts)

	return markdown.Render(doc, renderer)
}
