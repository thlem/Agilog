var gulp = require('gulp');
var gulps = {
  uglify  : require('gulp-uglify'),
  concat  : require('gulp-concat'),
  del     : require('del'),
  css     : require('gulp-minify-css'),
  gutil   : require('gulp-util')
};

var folders = {
  public:{
    all       : './public/',
    js        : './public/js/',
    css       : './public/css/',
    images    : './public/images/',
    partials  : './public/partials/'
  },
  app:{
    js      : './client/app/',
    css     : './client/styles/',
    static  : {
      partials  : './client/static/partials/',
      images    : './client/static/images/',
      all       : './client/static/'
    }
  },
  vendors:'./bower_component/'
};

var jsFiles = {
  app:[
    folders.app.js+'agilogApplication.js',
    folders.app.js+'**/*.js'
  ],
  vendors:[
    folders.vendors+'jquery/dist/jquery.js',
    folders.vendors+'angular/angular.js',
    folders.vendors+'angular-cookies/angular-cookies.js',
    folders.vendors+'angular-resource/angular-resource.js',
    folders.vendors+'angular-route/angular-route.js',
    folders.vendors+'angular-sanitize/angular-sanitize.js',
    folders.vendors+'ngstorage/ngstorage.js'
  ]
};

var cssFiles = {
  app:[
    folders.app.css+'main001.css',
    folders.app.css+'notification.css',
    folders.app.css+'navigation.css',
    folders.app.css+'authentication.css'
  ]
};

var staticFiles = {
  images    :[
    folders.app.static.images+'*.png',
    folders.app.static.images+'*.jpg'
  ],
  partials  :[
    folders.app.static.partials+'*.html'
  ]  
};
    
/**
 * @Task : clean
 */
gulp.task('clean', function(){
 
  gulps.del(folders.public.all);
 
});

/**
 * @Task : build
 */
gulp.task('build', ['buildApp', 'buildVendor', 'buildCss', 'buildStatic']);

/**
 * @Task : watch
 */
gulp.task('watch', ['buildApp', 'buildVendor', 'buildCss', 'buildStatic'], function() {
  
  /**************************************/
  /********* Watch JS APP files *********/
  /**************************************/
  
  gulp.watch(['./client/**/*.js'],[
    'buildApp'
  ]);
  
  /**************************************/
  /******* Watch JS VENDOR files ********/
  /**************************************/
  
  gulp.watch([folders.vendors+'**/*.js'],[
    'buildVendor'
  ]);
  
  /***************************************/
  /*********** Watch CSS files ***********/
  /***************************************/
  
  gulp.watch(['client/**/*.css'],[
    'buildCss'
  ]);
  
  /****************************************/
  /*********** Watch HTML files ***********/
  /****************************************/
  
  gulp.watch([folders.app.static.all+'**/*'],[
    'buildStatic'
  ]);

});

/**
 * @Task : concatJsAppFiles
 */
gulp.task('buildApp', function() {
  
  gulp.src(jsFiles.app).pipe(gulps.concat('app.min.js')).pipe(gulps.uglify().on('error', gulps.gutil.log)).pipe(gulp.dest(folders.public.js));
  
});

/**
 * @Task : concatjsVendorFiles
 */
gulp.task('buildVendor', function() {

  gulp.src(jsFiles.vendors).pipe(gulps.concat('vendors.min.js')).pipe(gulps.uglify().on('error', gulps.gutil.log)).pipe(gulp.dest(folders.public.js));

});

/**
 * @Task : concatjsVendorFiles
 */
gulp.task('buildCss', function() {

  gulp.src(cssFiles.app).pipe(gulps.concat('app.min.css')).pipe(gulps.css()).pipe(gulp.dest(folders.public.css));

});

/**
 * @Task : concatjsVendorFiles
 */
gulp.task('buildStatic', function() {

  gulp.src(staticFiles.images).pipe(gulp.dest(folders.public.images));
  gulp.src(staticFiles.partials).pipe(gulp.dest(folders.public.partials));

});
    