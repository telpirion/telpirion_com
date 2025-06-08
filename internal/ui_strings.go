package internal

const separator = "--------------------------------------------------------------------------------"

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
	Sidebar struct {
		Feed struct {
			Title string `json:"title"`
			Items []struct {
				Title       string `json:"title"`
				Image       string `json:"image,omitempty"`
				Description string `json:"description"`
				Date        string `json:"date"`
				Link        string `json:"link"`
			} `json:"items"`
		} `json:"feed"`
		Nav struct {
			Title string `json:"title"`
			Items []struct {
				Title string `json:"title"`
				Link  string `json:"link"`
				Items []struct {
					Title string `json:"title"`
					Link  string `json:"link"`
				} `json:"items,omitempty"`
			} `json:"items"`
		} `json:"nav"`
		Contact struct {
			Title       string `json:"title"`
			Description string `json:"description"`
			Items       []struct {
				Title string `json:"title"`
				Link  string `json:"link"`
				Icon  string `json:"icon"`
			} `json:"items"`
		}
		Footer struct {
			Copyright string `json:"copyright"`
		} `json:"footer"`
	} `json:"sidebar"`
}

type ListItemMetadata struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Image       string   `json:"image"`
	Url         string   `json:"url"`
	Tags        []string `json:"tags"`
	CodeURL     string   `json:"codeUrl,omitempty"`
	About       string   `json:"about,omitempty"`
}

type BlogMetadata struct {
	Title       string   `yaml:"title"`
	Description string   `yaml:"description"`
	Date        string   `yaml:"date"`
	Slug        string   `yaml:"slug"`
	State       string   `yaml:"state"`
	Tags        []string `yaml:"tags"`
	Filepath    string   `yaml:"filepath"`
	Image       string   `yaml:"image"`
}

type PublicationMetadata struct {
	ListItemMetadata
	Host string `json:"host"`
	Date string `json:"date"`
}

type ProjectMetadata struct {
	ListItemMetadata
}

type GameMetadata struct {
	ListItemMetadata
	JS    string `json:"jsSrc"`
	CSS   string `json:"cssSrc"`
	HTML  string `json:"htmlSrc"`
	About string `json:"about"`
}

type AppMetadata struct {
	ListItemMetadata
}
