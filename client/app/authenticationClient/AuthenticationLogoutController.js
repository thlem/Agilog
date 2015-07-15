(function(){
	'use strict';
	
	/**
	 * @desc: Controller relating to the register form
	 */

	angular.module('agilogClient').controller('AuthenticationLogoutController',
		getAuthenticationLogoutController);

	var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory', 'NotificationClientService'];

	getAuthenticationLogoutController.$inject = inject;
		

	function getAuthenticationLogoutController(
		$scope, $location, $rootScope, AuthenticationFactory, NotificationClientService){
		
		/**
		 * Méthode disponible dans le scope du controller permettant de 
		 * lancer la procédure de déconnexion
		 */
		$scope.logout = function(){
			// Affichage du spinner de loading
			$rootScope.startLoading();
			// Appel à la méthode de logout dans le Service
			AuthenticationFactory.logout()
			.then(function(response){
				// Quelque que soit le retour du Service on déconnecte l'utilisateur
				// côté client
				NotificationClientService.addToSuccessMessages(response.data.message);
				AuthenticationFactory.removeUserFromLocalStorage();
				$rootScope.endLoading();
				// On redirige vers l'accueil
				$location.url('/');
			});
		};

	}

})();