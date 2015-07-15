(function(){
	'use strict';
	
	/**
	 * @desc: Controller relating to the register form
	 */

	angular.module('agilogClient').controller('AuthenticationLoginController',
		getAuthenticationLoginController);

	var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory'];

	getAuthenticationLoginController.$inject = inject;
		

	function getAuthenticationLoginController($scope, $location, $rootScope, AuthenticationFactory){
		
		// Used as ng-model
		$scope.user = {};

	}

})();