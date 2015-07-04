agilogClient.controller("AccountClientController", ["$scope", "$rootScope",
	function($scope, $rootScope){
		$rootScope.root.pageTitle = "Gestion de votre compte utilisateur";
		$scope.user = $rootScope.root.user;
	}
]);