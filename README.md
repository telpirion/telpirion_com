<!-- 
 README for Telpirion.com site.
 
 author     Eric Schmidt
 version    0.2.0 2025/05/26
 copyright  Eric Schmidt
-->

# Telpirion.com

This code repository contains the source code for Telpirion.com, 
my personal web site. This code is provided for educational
and illustrative purposes only.

All code provided here is copyrighted by me, 
[Eric Schmidt](https://www.linkedin.com/in/eric-schmidt-692640/).

You can find a deployed version of the site
[here](https://base-image-jq6kqb2l4q-uw.a.run.app).

## Documentation

The website is built on Google Cloud Run, using Go & Gin 
templates, plan ol' JavaScript, and some fancy CSS. The style of the site
is the "Editorial" theme taken from [html5up.net](https://html5up.net/).

### Run the site locally

To build & run the site locally, all you need to do is run the following
command:

```sh
go run .
```

That's all!

### Work with the container

To rebuild the Docker image, run the following command from the root
folder:

```sh
docker build -t telpirion-com .
```

To run the site from a Docker container, run the following command
from the root folder:

```sh
docker run -it --rm -p 8080:8080 --name telpirion-com-running telpirion-com
```

### Deploy the app

First, add a version tag for this image:

```sh
docker tag telpirion-com \
us-west1-docker.pkg.dev/$PROJECT_ID/telpirion-com/base-image:$VERSION
```

Next, update the image in the Google Cloud Artifact registry:

```sh
docker push us-west1-docker.pkg.dev/$PROJECT_ID/telpirion-com/base-image:$VERSION
```

Finally, go to Cloud Run and create a service from this image.

## Deploy the app with Cloud Build

To deploy the app with Cloud Build, run the following command from the root of
the repository.

```sh
gcloud builds submit --region=us-west1 --config cloudbuild.yaml \
--substitutions=_VERSION=$VERSION
```

## References

Go: https://go.dev/
Gin: https://github.com/gin-gonic/gin
Docker: https://www.docker.com/
Cloud Run: https://cloud.google.com/run/docs
Cloud Build: https://cloud.google.com/build/docs

