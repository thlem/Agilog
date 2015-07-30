(function(){
    'use strict';

    /*
     * @desc: Initialize the module of the application
     */

    angular.module('agilog', ['ngResource', 'ngRoute', 'ngStorage']);


    /*
     * @desc: congig of routes and request/response interceptor
     */

    angular.module('agilog').config(getConfig);

    var injectConfig = ['$routeProvider', '$httpProvider'];

    getConfig.$inject = injectConfig;

    function getConfig($routeProvider, $httpProvider){
        
        /**********************************************************/
        /********************ROUTES DEFINITION*********************/
        /**********************************************************/

    	$routeProvider
    	.when('/', {
    		templateUrl: 'partials/accueil.html',
    		public: true
    	})
    	.when('/login', {
    		templateUrl: 'partials/loginForm.html',
    		guestOnly: true,
            public: true
    	})
        .when('/logout', {
            template: ' ', // just fire controller
            controller:'AuthenticationLogoutController'
        })
    	.when('/register', {
    		templateUrl: 'partials/registerForm.html',
    		guestOnly: true,
            public: true
    	})
        .when('/account', {
            templateUrl: 'partials/account.html'
        })
    	.otherwise({
            redirectTo: '/'
        });

    	
        /**********************************************************/
        /*******************INTERCEPTOR CONFIG*********************/
        /**********************************************************/

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$rootScope', 'NotificationFactory',
            function($q, $location, $localStorage, $rootScope, NotificationFactory) {
                return {
                    // Ajout du token au header de la request
                    'request': function (config) {
                        config.headers = config.headers || {};
                        if ($localStorage.user) {
                            config.headers.Authorization = 'Bearer ' + $localStorage.user.token;
                        }
                        return config;
                    },
                    // Traitement des réponses en erreur
                    'responseError': function(response) {
                        var deferred = $q.defer();

                        //
                        // * Response Code *
                        // 400 : Functionnal error
                        // 401 : If the user is not logged
                        // 403 : If the user is logged but have not the good permission
                        // 404 : Resource not found on the server
                        // 500 : Technical error
                        //

                        switch(response.status){
                            case 400:
                                // Functional error after a form submit
                                NotificationFactory.addToErrorMessages(response.data.message);
                                return $q.reject(response);
                            case 401:
                                // User not logged
                                // Be sure client storage is clean
                                delete $localStorage.user;
                                delete $rootScope.root.user;
                                NotificationFactory.addToErrorMessages(response.data.message);
                                $location.url('/');
                                return $q.reject(response);
                            case 403:
                                // Wrong permission
                                NotificationFactory.addToErrorMessages(response.data.message);
                                return $q.reject(response);
                            case 404:
                                // Resource not found
                                NotificationFactory.addToErrorMessages('La ressource demandée est introuvable');
                                return $q.reject(response);
                            case 500:
                                // Technical error
                                NotificationFactory.addToErrorMessages('ouch');
                                return $q.reject(response);
                            default:
                                // Other error not listed, resolve the promise
                                deferred.resolve(response);
                                return deferred.promise;
                        }
                    }
                };
            }]);
    }

    /*
     * @desc: run Kickstart the application
     */

    angular.module('agilog').run(getRun);

    var injectRun = ['$rootScope', '$localStorage', 'StorageFactory',
        'ProxyFactory', 'UrlConstant', 'NotificationFactory', 'ErrorMessageConstant'];

    getRun.$inject = injectRun;

    function getRun($rootScope, $localStorage, StorageFactory, ProxyFactory,
        UrlConstant, NotificationFactory, ErrorMessageConstant){
     	$rootScope.root = {};
    	$rootScope.root.loading = null;
        $rootScope.root.loadingQueue = 0;
        $rootScope.root.pageTitle = 'Home';

        // If the localStorage contains a user
        if($localStorage.user){
            // Update the global scope
            $rootScope.root.user = $localStorage.user;
        }

        // When the route change
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // If the next route is defined
            if(next){
                // Check if the user is online
                StorageFactory.isUserOnline()
                // If the user is logged
                .then(function(){
                    // If the route is guestOnly, we cannot access to this route
                    if(next.guestOnly){
                        NotificationFactory.addToErrorMessages(ErrorMessageConstant.GUEST_ONLY_ERROR);
                        ProxyFactory.redirect(UrlConstant.CLIENT_HOME);
                    }
                })
                // If the user is not logged
                .catch(function(){
                    // If the route is not public, we restrict the access
                    if(!next.public){
                        NotificationFactory.addToErrorMessages(ErrorMessageConstant.REGISTER_ONLY_ERROR);
                        ProxyFactory.redirect(UrlConstant.CLIENT_LOGIN);
                    }
                });
            }
        });
    }
})();