(function(){
	'use strict';
	
	/**
	 * @desc: Controller relating to the logout action
	 */

	angular.module('agilogClient').controller('AuthenticationLogoutController',
		getAuthenticationLogoutController);

	var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
		'NotificationClientService', 'UrlFactory', 'UrlConstant'];

	getAuthenticationLogoutController.$inject = inject;
		

	function getAuthenticationLogoutController($scope, $location, $rootScope,
		AuthenticationFactory, NotificationClientService, UrlFactory, UrlConstant){
		
		// Call the Factory that call the server
		// Do the logout
		$scope.logout = function(){
			$rootScope.startLoading();
			// Call of the factory
			AuthenticationFactory.logout()
			.then(function(response){
				// Always logout the user, even if the server return a bad response
				NotificationClientService.addToSuccessMessages(response.data.message);
				AuthenticationFactory.removeUserFromLocalStorage();
				$rootScope.endLoading();
				// Redirect to the Home
				UrlFactory.redirect(UrlConstant.HOME);
			});
		};

	}

})();