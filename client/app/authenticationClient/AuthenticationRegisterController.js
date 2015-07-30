(function(){
	'use strict';
	
	/**
	 * @desc: Controller relating to the register form
	 */

	angular.module('agilog').controller('AuthenticationRegisterController', getAuthenticationRegisterController);

	var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
		'NotificationFactory', 'ProxyFactory', 'UrlConstant', 'StorageFactory'];

	getAuthenticationRegisterController.$inject = inject;
		

	function getAuthenticationRegisterController($scope, $location, $rootScope,
		AuthenticationFactory, NotificationFactory, ProxyFactory, UrlConstant, StorageFactory){

		/*jshint validthis: true */
		var vm = this;

		// Call the Factory that call the server
		// Submit the register data
		vm.submitRegisterForm = function(arrayOfUserData, errorCallback){
			AuthenticationFactory.submitRegisterForm(arrayOfUserData)
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
                    errorCallback();
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