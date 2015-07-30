(function(){
	'use strict';
	
	/**
	 * @desc: Controller relating to the login form
	 */

	angular.module('agilog').controller('AuthenticationLoginController', getAuthenticationLoginController);

	var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
	'NotificationFactory', 'ProxyFactory', 'UrlConstant', 'StorageFactory'];

	getAuthenticationLoginController.$inject = inject;
		

	function getAuthenticationLoginController($scope, $location, $rootScope,
		AuthenticationFactory, NotificationFactory, ProxyFactory, UrlConstant, StorageFactory){
		
		/*jshint validthis: true */
		var vm = this;

		// Call the Factory that call the server
		// Submit the login data
		vm.submitLoginForm = function(arrayOfUserData){
			AuthenticationFactory.submitLoginForm(arrayOfUserData)
			.then(function(responseData){
				// If the server returns the user correctly
				if(responseData.user){
					// Add it to the localStorage
					StorageFactory.addOrUpdateUserInLocalStorage(responseData.user);
					NotificationFactory.addToSuccessMessages(responseData.message);
					$rootScope.endLoading();
					ProxyFactory.redirect(UrlConstant.CLIENT_HOME);
				}
				else{
					NotificationFactory.addToErrorMessages('Something goes wrong');
					$rootScope.endLoading();
				}
			})
			.catch(function(responseData){
				NotificationFactory.addToErrorMessages(responseData.message);
				$rootScope.endLoading();
			});
		};

		// Used as ng-model
		$scope.user = {};

	}

})();