/**
 * @Type        : Controller
 * @Name        : AccountClientController
 * @Description : Ce controller est associé à la vue de gestion de compte
 *                Met à disposition du scope local le user présent dans
 *				  le scope global
 */
agilogClient.controller("AccountClientController", ["$scope", "$rootScope",
	function($scope, $rootScope){
		$rootScope.root.pageTitle = "Gestion de votre compte utilisateur";
		$scope.user = $rootScope.root.user;
	}
]);