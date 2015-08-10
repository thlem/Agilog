(function(){
	'use strict';
	
    /**
     * @name AuthenticationFactory
     * @description Factory that offers method relative to the auth form submission
     * @memberof ag.acc.auth
     */

    angular.module('ag.acc.auth').factory('AuthenticationFactory', getAuthenticationFactory);
    
	var inject = ['$localStorage', '$rootScope', '$http', '$q', 'ProxyFactory', 'ApiConstant'];
	getAuthenticationFactory.$inject = inject;

    function getAuthenticationFactory($localStorage, $rootScope, $http, $q, ProxyFactory, ApiConstant){

		/**
		 * Public method that are accessible
		 * @type {Object}
		 */
		var ret = {
			submitRegisterForm: 			submitRegisterForm,
			submitLoginForm: 				submitLoginForm,
			logout: 						logout
		};
		return ret;

		// Submit register form data to the server
		function submitRegisterForm(arrayOfUserData){
            return ProxyFactory.sendPostRequest(ApiConstant.AUTH_REGISTER, arrayOfUserData);
		}

		// Submit login form data to the server
		function submitLoginForm(arrayOfUserData, callback){
            return ProxyFactory.sendPostRequest(ApiConstant.AUTH_LOGIN, arrayOfUserData);
		}

	    // Send to the server the request to logout the user
	    function logout(){
	    	return ProxyFactory.sendGetRequest(ApiConstant.AUTH_LOGOUT);
	    }

    }

})();