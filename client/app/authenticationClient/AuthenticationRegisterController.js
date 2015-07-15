(function(){
	'use strict';
	
	/**
	 * @desc: Controller relating to the register form
	 */

	angular.module('agilogClient').controller('AuthenticationRegisterController',
		getAuthenticationRegisterController);

	var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory'];

	getAuthenticationRegisterController.$inject = inject;
		

	function getAuthenticationRegisterController($scope, $location, $rootScope, AuthenticationFactory){
		
		// Used as ng-model
		$scope.user = {};

	}

})();