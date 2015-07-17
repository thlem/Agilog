(function(){
	'use strict';
/**
 * @Type        : Controller
 * @Name        : AccountClientController
 * @Description : Ce controller est associé à la vue de gestion de compte
 *                Met à disposition du scope local le user présent dans
 *				  le scope global
 */
angular.module("agilog").controller("AccountClientController", ["$scope", "$rootScope",
	function($scope, $rootScope){
		$rootScope.root.pageTitle = "Gestion de votre compte utilisateur";
		$scope.user = $rootScope.root.user;
	}
]);
})();