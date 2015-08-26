(function(){
	'use strict';
	
    /**
     * @name AccountManageFactory
     * @description Factory that offers method relative to account manage forms
     * @memberof ag.acc.manage
     */

    angular.module('ag.acc.manage').factory('AccountManageFactory', getAccountManageFactory);
    
	var inject = ['ProxyFactory', 'ApiConstant'];
	getAccountManageFactory.$inject = inject;

    function getAccountManageFactory(ProxyFactory, ApiConstant){

		/**
		 * Public method that are accessible
		 * @type {Object}
		 */
		var ret = {
			submitAccountManageLoginInfo : submitAccountManageLoginInfo
		};
		return ret;
        
        function submitAccountManageLoginInfo(arrayOfUserData){
            return ProxyFactory.sendPostRequest(ApiConstant.ACC_MNG_LOGIN, arrayOfUserData);
        }
    }

})();