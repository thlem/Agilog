var gulp 		= require('gulp'),
	gulpModule 	= {
		jsdoc  :require('gulp-jsdoc'),
		concat :require('gulp-concat'),
		del    :require('del'),
		gutil  :require('gulp-util'),
		uglify :require('gulp-uglify'),
		css    :require('gulp-minify-css')
	};


var folders = {
	js      :'./src/app/agilog/',
	css     :'./src/styles/',
	html    :'./src/partials/',
	images  :'./src/images',
	vendors :'./bower_component/',
	public  :{
		js:'./public/js/',
		css:'./public/css/',
		html:'./public/partials/',
		images:'./public/images',
		all:'./public/'
	}
};

var order = {
	js:[
		folders.js+'technical/*.module.js',
		folders.js+'technical/**/*.js',
		folders.js+'navigation/*.module.js',
		folders.js+'navigation/**/*.js',
		folders.js+'notification/*.module.js',
		folders.js+'notification/**/*.js',
		folders.js+'account/authentification/*.module.js',
		folders.js+'account/authentification/**/*.js',
		folders.js+'account/manage/*.module.js',
		folders.js+'account/manage/**/*.js',
		folders.js+'account/*.module.js',
		folders.js+'*.module.js',
		folders.js+'!(*.module.js)*.js'
	],
	css:[
		folders.css+'reset.css',
		folders.css+'main.css',
		folders.css+'navigation.css',
		folders.css+'notification.css',
		folders.css+'authentication.css'
	],
	vendors:[
	    folders.vendors+'jquery/dist/jquery.js',
	    folders.vendors+'angular/angular.js',
	    folders.vendors+'angular-cookies/angular-cookies.js',
	    folders.vendors+'angular-resource/angular-resource.js',
	    folders.vendors+'angular-ui-router/release/angular-ui-router.js',
	    folders.vendors+'angular-sanitize/angular-sanitize.js',
	    folders.vendors+'ngstorage/ngstorage.js'
	  ]

};

var production = !!gulpModule.gutil.env.production;

gulp.task('clean', function(){
 
  gulpModule.del(folders.public.all);
 
});

gulp.task('doc', function(){
	gulp.src(['./src/app/**/*.js'])
	.pipe(gulpModule.jsdoc.parser())
	.pipe(gulpModule.jsdoc.generator('./doc'));
});

gulp.task('buildApp', function(){
	if(production){
		gulp.src(order.js)
		.pipe(gulpModule.concat('app.min.js'))
		.pipe(gulpModule.uglify())
		.pipe(gulp.dest(folders.public.js));
	}
	else{
		gulp.src(order.js)
		.pipe(gulpModule.concat('app.min.js'))
		.pipe(gulp.dest(folders.public.js));
	}
});

gulp.task('buildVendor', function() {
  gulp.src(order.vendors)
  .pipe(gulpModule.concat('vendors.min.js'))
  .pipe(gulpModule.uglify())
  .pipe(gulp.dest(folders.public.js));

});

gulp.task('buildCss', function() {

  gulp.src(order.css)
  .pipe(gulpModule.concat('app.min.css'))
  .pipe(gulpModule.css())
  .pipe(gulp.dest(folders.public.css));

});

gulp.task('buildStatic', function() {

  gulp.src(folders.images+'**/*')
  .pipe(gulp.dest(folders.public.all));

  gulp.src(folders.html+'**/*.html')
  .pipe(gulp.dest(folders.public.html));

});

gulp.task('watch', ['buildApp', 'buildVendor', 'buildCss', 'buildStatic'], function() {
  
  /**************************************/
  /********* Watch JS APP files *********/
  /**************************************/
  
  gulp.watch([folders.js+'**/*.js'],[
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
  
  gulp.watch([folders.css+'**/*.css'],[
    'buildCss'
  ]);
  
  /****************************************/
  /********* Watch HTML&IMG files *********/
  /****************************************/
  
  gulp.watch([folders.images+'**/*'],[
    'buildStatic'
  ]);
  gulp.watch([folders.html+'**/*'],[
    'buildStatic'
  ]);

});

gulp.task('build', ['buildApp', 'buildVendor', 'buildCss', 'buildStatic']);