/**
 * @Type        : Controller
 * @Name        : AuthenticationRegisterClientController
 * @Description : Ce Controller correspond à la vue du formulaire d'enregistrement
 *				  Il met à disposition dans le scope l'objet json user
 */
agilogClient.controller("AuthenticationRegisterClientController", ["$scope", "$location", "$rootScope", "AuthenticationClientService",
	function($scope, $location, $rootScope, AuthenticationClientService){
		$scope.user = {};

}]);

/**
 * @Type        : Controller
 * @Name        : AuthenticationLoginClientController
 * @Description : Ce Controller correspond à la vue du formulaire de connexion
 *				  Il met à disposition dans le scope l'objet json user
 */
agilogClient.controller("AuthenticationLoginClientController", ["$scope", "$location", "$rootScope", "AuthenticationClientService",
	function($scope, $location, $rootScope, AuthenticationClientService){
		$scope.user = {};

}]);

/**
 * @Type        : Controller
 * @Name        : AuthenticationLogoutClientController
 * @Description : Ce Controller ne correspond à aucune vue en paritculier
 *				  Il met à disposition la méthode de logout
 */
agilogClient.controller("AuthenticationLogoutClientController", ["$scope", "$location", "$rootScope", "AuthenticationClientService", "NotificationClientService",
	function($scope, $location, $rootScope, AuthenticationClientService, NotificationClientService){

		/**
		 * Méthode disponible dans le scope du controller permettant de 
		 * lancer la procédure de déconnexion
		 */
		$scope.logout = function(){
			// Affichage du spinner de loading
			$rootScope.startLoading();
			// Appel à la méthode de logout dans le Service
			AuthenticationClientService.logout()
			.then(function(response){
				// Quelque que soit le retour du Service on déconnecte l'utilisateur
				// côté client
				NotificationClientService.addToSuccessMessages(response.data.message);
				AuthenticationClientService.removeUserFromLocalStorage();
				$rootScope.endLoading();
				// On redirige vers l'accueil
				$location.url("/");
			});
		};

}]);