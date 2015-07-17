(function(){
    'use strict';

angular.module("agilog", ["ngResource", "ngRoute", "ngStorage"]);

angular.module("agilog").config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider){
	$routeProvider
	.when("/", {
		templateUrl: "partials/accueil.html",
		public: true
	})
	.when("/login", {
		templateUrl: "partials/loginForm.html",
		controller: "AuthenticationLoginController",
		public: true
	})
	.when("/register", {
		templateUrl: "partials/registerForm.html",
		public: true
	})
    .when("/account", {
        templateUrl: "partials/account.html",
        controller: "AccountClientController"
    })
	.otherwise({
        redirectTo: "/"
    });

	/**
     * Création d'un interceptor : 
     * Lorsqu'une requête est émise (via $http) on ajoute au header le token utilisateur
     * Lorsqu'une réponse est reçu (via $http) on vérifie si elle est en erreur et traite le code retour
     */
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$rootScope', 'NotificationClientService',
    function($q, $location, $localStorage, $rootScope, NotificationClientService) {
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
                // Traitement des cas particuliers pour les codes erreur ci-dessous
                switch(response.status){
                    case 400:
                        NotificationClientService.addToErrorMessages(response.data.message);
                        return $q.reject(response);
                    case 401:
                        // Si l'utilisateur tente d'accéder à une ressource sans être connecté
                        // On s'assure qu'il n'est pas présent dans le local storage
                        // et on le redirige vers l'accueil
                        delete $localStorage.user;
                        delete $rootScope.root.user;
                        NotificationClientService.addToErrorMessages(response.data.message);
                        $location.url('/');
                        return $q.reject(response);
                    break;
                    case 403:
                        // si l'utilisateur tente d'accéder à une ressource dont il n'a pas les droits
                        // On le redirige vers une page informative
                        NotificationClientService.addToErrorMessages(response.data.message);
                        return $q.reject(response);
                    break;
                    case 404:
                        NotificationClientService.addToErrorMessages("La ressource demandée est introuvable");
                        return $q.reject(response);
                    case 500:
                        NotificationClientService.addToErrorMessages("ouch");
                        return $q.reject(response);
                    default:
                        // Si l'erreur n'est pas cité ci-dessus on indique à la response
                        // de continuer son chemin nominal
                        deferred.resolve(response);
                        return deferred.promise;
                    break;
                }
            }
        };
    }]);

}]);

angular.module("agilog").run(["$rootScope", "$localStorage", function($rootScope, $localStorage){
 	$rootScope.root = {};
	$rootScope.root.loading = null;
    $rootScope.root.loadingQueue = 0;
    $rootScope.root.pageTitle = "Accueil";

    // Si le local-storage contient un utilisateur
    if($localStorage.user){
        // On le rajoute au scope globale
        $rootScope.root.user = $localStorage.user;
    }
}]);
})();