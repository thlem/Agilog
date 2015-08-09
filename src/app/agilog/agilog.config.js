(function(){
    'use strict';

	/**
	 * @name config
	 * @description The configuration of the module
     * @namespace ag
	 */

    angular.module('ag').config(getConfig);

    var inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider'];

    getConfig.$inject = inject;

    function getConfig($httpProvider, $stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/");
         $stateProvider
        .state('Home', {
            url: "/",
            templateUrl: "partials/accueil.html"
        });


    	/**********************************************************/
        /*******************INTERCEPTOR CONFIG*********************/
        /**********************************************************/

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$rootScope',
            function($q, $location, $localStorage, $rootScope) {
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
                               /* NotificationFactory.addToErrorMessages(response.data.message);*/
                                return $q.reject(response);
                            case 401:
                                // User not logged
                                // Be sure client storage is clean
                                delete $localStorage.user;
                                delete $rootScope.root.user;
                               /* NotificationFactory.addToErrorMessages(response.data.message);*/
                                $location.url('/');
                                return $q.reject(response);
                            case 403:
                                // Wrong permission
                              /*  NotificationFactory.addToErrorMessages(response.data.message);*/
                                return $q.reject(response);
                            case 404:
                                // Resource not found
                             /*   NotificationFactory.addToErrorMessages('La ressource demandée est introuvable');*/
                                return $q.reject(response);
                            case 500:
                                // Technical error
                             /*   NotificationFactory.addToErrorMessages('ouch');*/
                                return $q.reject(response);
                            default:
                                // Other error not listed, resolve the promise
                                deferred.resolve(response);
                                return deferred.promise;
	                    }
	                }
	            };
        	}
    	]);
    }
})();