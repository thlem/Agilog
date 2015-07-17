(function(){
	'use strict';
	
	/**
	 * @desc: Controller relating to the register form
	 */

	angular.module('agilog').controller('AuthenticationRegisterController',
		getAuthenticationRegisterController);

	var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
		'NotificationClientService', 'UrlFactory', 'UrlConstant'];

	getAuthenticationRegisterController.$inject = inject;
		

	function getAuthenticationRegisterController($scope, $location, $rootScope,
		AuthenticationFactory, NotificationClientService, UrlFactory, UrlConstant){

		/*jshint validthis: true */
		var vm = this;

		// Call the Factory that call the server
		// Submit the register data
		vm.submitRegisterForm = function(arrayOfUserData){
			AuthenticationFactory.submitRegisterForm(arrayOfUserData)
			.then(function(responseData){
				// If the server returns the user correctly
				if(responseData.user){
					// Add it to the localStorage
					AuthenticationFactory.addOrUpdateUserInLocalStorage(responseData.user);
					NotificationClientService.addToSuccessMessages(responseData.message);
					$rootScope.endLoading();
					UrlFactory.redirect(UrlConstant.HOME);
				}
				else{
					NotificationClientService.addToErrorMessages('Something goes wrong');
					$rootScope.endLoading();
				}
			})
			.catch(function(responseData){
				NotificationClientService.addToErrorMessages(responseData.message);
				$rootScope.endLoading();
			});
		};

		// Used as ng-model
		$scope.user = {};

	}

})();