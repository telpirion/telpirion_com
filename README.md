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
[here](https://telpirion-com.appspot.com/home).

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

To run the site, use the following command from the `src` folder:

```
dev_appserver.py app.yaml
```

To reinstall all of the NodeJS dependencies (for example, after changing
git branches), use the following command:

```
npm install
```

### Deploy the app

First, build the app locally to create a new version of the Angular app.

To deploy the app, run the following command from the `site` folder:

```
gcloud app deploy
```

## References

Google Cloud AppEngine Standard:
  * [Overview](https://cloud.google.com/appengine/docs/standard/python/runtime#customized-libraries-in-python-version-27)
  * [Deploying Angular to AppEngine](https://medium.com/@asanoop24/deploying-angular-6-app-on-google-app-engine-b6259d4c16c2)
  * [Code sample](https://github.com/googlecodelabs/cloud-cardboard-viewer)

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