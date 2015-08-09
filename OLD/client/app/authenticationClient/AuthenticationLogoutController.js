(function(){
	'use strict';
	
	/**
	 * @desc: Controller relating to the logout action
	 */

	angular.module('agilog').controller('AuthenticationLogoutController',
		getAuthenticationLogoutController);

	var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
		'NotificationFactory', 'ProxyFactory', 'UrlConstant', 'StorageFactory'];

	getAuthenticationLogoutController.$inject = inject;
		

	function getAuthenticationLogoutController($scope, $location, $rootScope,
		AuthenticationFactory, NotificationFactory, ProxyFactory, UrlConstant, StorageFactory){
		
		$rootScope.startLoading();
		// Call of the factory
		AuthenticationFactory.logout()
		.then(function(responseData){
			// Always logout the user, even if the server return a bad response
			NotificationFactory.addToSuccessMessages(responseData.message);
			StorageFactory.removeUserFromLocalStorage();
			$rootScope.endLoading();
			// Redirect to the Home
			ProxyFactory.redirect(UrlConstant.CLIENT_HOME);
		});

	}

})();