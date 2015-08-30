(function(){
	'use strict';

	/**
     * @name NameConstant
     * @description Constant file for API server side url
     * @memberof ag.tech
     */

	angular.module('ag.tech').constant('ApiConstant', {
		AUTH_REGISTER          : '/auth/register',
		AUTH_LOGIN             : '/auth/login',
		AUTH_LOGOUT            : '/auth/logout',
        ACC_MNG_LOGIN          : '/account/update/logininfo',
        ACC_MNG_DELETE_ACCOUNT : '/account/delete'
	});
	
})();