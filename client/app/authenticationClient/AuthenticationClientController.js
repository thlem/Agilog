agilogClient.controller("AuthenticationRegisterClientController", ["$scope", "$location", "$rootScope", "AuthenticationClientService",
	function($scope, $location, $rootScope, AuthenticationClientService){
		$scope.user = {};

}]);

agilogClient.controller("AuthenticationLoginClientController", ["$scope", "$location", "$rootScope", "AuthenticationClientService",
	function($scope, $location, $rootScope, AuthenticationClientService){
		$scope.user = {};

}]);

agilogClient.controller("AuthenticationLogoutClientController", ["$scope", "$location", "$rootScope", "AuthenticationClientService", "NotificationClientService",
	function($scope, $location, $rootScope, AuthenticationClientService, NotificationClientService){

	$scope.logout = function(){
		$rootScope.startLoading();
		AuthenticationClientService.logout()
		.then(function(response){
			NotificationClientService.addToSuccessMessages(response.data.message);
			AuthenticationClientService.removeUserFromLocalStorage();
			$rootScope.endLoading();
			$location.url("/");
		});
	};

}]);