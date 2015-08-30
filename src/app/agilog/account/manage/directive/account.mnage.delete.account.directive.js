(function(){
    'use strict';

	/**
	 * @name accountManageDeleteAccountdir
	 * @description The description of directive
     * @memberof ag.acc.manage
	 */

    angular.module('ag.acc.manage').directive('accountManageDeleteAccountDir', getAccountManageDeleteAccountDir);

    var inject = [];

    getAccountManageDeleteAccountDir.$inject = inject;

    function getAccountManageDeleteAccountDir(){
        return{
            restrict:'A',
            controller: 'AccountManageController as AccCtrl',
            link:function(scope, element, attrs, AccCtrl){

            	element.on('click', function(){
            		AccCtrl.deleteAccount();
            	});

            }
        };
    }
})();