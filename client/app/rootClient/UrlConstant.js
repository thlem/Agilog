(function(){
	'use strict';

	/**
	 * @desc: Constant that contains all CLIENT/SERVER URL
	 */

	angular.module('agilog').constant('UrlConstant', getUrlConstant);

	function getUrlConstant(){
		return {
			CLIENT_HOME: '/',
			CLIENT_LOGIN: '#/login',
			CLIENT_REGISTER: '#/register',
			CLIENT_ACCOUNT_MANAGER: '#/account'
		};
	}

})();