exports.config = {
    "paths": {
        "watched": ["client"],
        "public": "public"
    },
    "files": {
        "stylesheets": {
            "joinTo":
                "css/app.min.css",
            "order": {
                "before": [
                    "client/styles/main001.css"
                ]
            }
        },
        "javascripts": {
            "joinTo": {
                "js/app.min.js": /^client[\\/]app/,
                "js/vendor.min.js": [
                    "bower_component/jquery/dist/jquery.js",
                    "bower_component/angular/angular.js",
                    "bower_component/angular-cookies/angular-cookies.js",
                    "bower_component/angular-resource/angular-resource.js",
                    "bower_component/angular-route/angular-route.js",
                    "bower_component/angular-sanitize/angular-sanitize.js",
                    "bower_component/ngstorage/ngStorage.js"
                ]
            },
            "order": {
                "before": [
                    "bower_component/jquery/jquery.js",
                    "bower_component/angular/angular.js",
                    "bower_component/angular-cookies/angular-cookies.js",
                    "bower_component/angular-resource/angular-resource.js",
                    "bower_component/angular-route/angular-route.js",
                    "bower_component/angular-sanitize/angular-sanitize.js",
                    "bower_component/ngstorage/ngStorage.js",
                    "client/app/navigationClient/NavigationModule.js",
                    "client/app/agilogClient.js"
                ]
            }
        }
    },
    "conventions": {
        "assets": /^client[\\/]static[\\/]/
    },
    "plugins": {
        "on": ["css-brunch", "javascript-brunch", "uglify-js-brunch", "clean-css-brunch"],
        "off": [],
        "autoreload": "true"
    },
    "modules": {
        "definition": false,
        "wrapper": false
    }
}
