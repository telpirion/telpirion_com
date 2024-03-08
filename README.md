<!-- 
 README for Telpirion.com site.
 
 author     Eric Schmidt
 version    1.1 2024/03/04
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

The website is built on Google Cloud AppEngine, using
Python and Angular.

### Build and run the app (dev environment)

To run the Angular app on the Angular runserver, use
the following command from the `src` folder:

```
ng serve --open
```

To build the Angular app, use the following command from the
`src` folder:

```
ng build --prod
```

To build the entire site using the Gulp file, use the
following command from the `src` folder:

```
gulp build
```

To run the site, use the following command from the root folder:

```
go run .
```

To reinstall all of the NodeJS dependencies (for example, after changing
git branches), use the following command:

```
npm install
```

### Work with the container

To rebuild the Docker image, run the following command from the root
folder:

```
docker build -t telpirion-com .
```

To run the site from a Docker container, run the following command
from the root folder:

```
docker run -it --rm -p 8080:8080 --name telpirion-com-running telpirion-com
```

### Deploy the app

First, add a version tag for this image:

```
docker tag telpirion-com \
us-west1-docker.pkg.dev/telpirion-com/telpirion-com/base-image:v1
```

Next, update the image in the Google Cloud Artifact registry:

```
docker push us-west1-docker.pkg.dev/PROJECT_ID/telpirion-com/base-image:TAG
```

Finally, go to Cloud Run and create a service from this image.

## References

<!--TODO: add links to Go, Gin, Docker, etc-->

Angular:
  * [Getting started](https://angular.io/guide/quickstart#getting-started)
  * [Angular CLI ref](https://angular.io/cli/build)
  * [Angular Material getting started](https://material.angular.io/guide/getting-started)
  * [Material Design icon set](https://material.io/tools/icons/)
  * [Angular Flex layout](https://github.com/angular/flex-layout)

Gulp:
  * [Gulp 4 how-to](https://fettblog.eu/gulp-4-parallel-and-series/)
  * [Old Gulp how-to](https://www.smashingmagazine.com/2014/06/building-with-gulp/)
  * [gulp-exec](https://www.npmjs.com/package/gulp-exec)
  * [del](https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md)
  * [gulp-concat](https://www.npmjs.com/package/gulp-concat)
  * [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
  * [gulp-html-replace](https://www.npmjs.com/package/gulp-html-replace)
  * [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)