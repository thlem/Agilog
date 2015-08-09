(function(){
	'use strict';

	/**
	 * @desc: This service offers methods used by authentification and register form
	 */

	angular.module('agilog').factory('AuthenticationFactory', getAuthenticationFactory);

	getAuthenticationFactory.$inject = ['$localStorage', '$rootScope', '$http', '$q', 'ProxyFactory'];

	
	function getAuthenticationFactory($localStorage, $rootScope, $http, $q, ProxyFactory){

		// Visible methods
		var service = {
			submitRegisterForm: 			submitRegisterForm,
			submitLoginForm: 				submitLoginForm,
			logout: 						logout
		};
		return service;

		// Submit register form data to the server
		function submitRegisterForm(arrayOfUserData){
            return ProxyFactory.sendPostRequest('/auth/register', arrayOfUserData);
		}

		// Submit login form data to the server
		function submitLoginForm(arrayOfUserData, callback){
            return ProxyFactory.sendPostRequest('/auth/login', arrayOfUserData);
		}

	    // Send to the server the request to logout the user
	    function logout(){
	    	return ProxyFactory.sendGetRequest('/auth/logout');
	    }
	}
})();