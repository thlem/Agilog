(function(){
	'use strict';
	
    /**
     * @name ProxyFactory
     * @description Factory that offers methods relative to the api communication
     * @memberof ag.tech
     */

    angular.module('ag.tech').factory('ProxyFactory', getProxyFactory);
    
	var inject = [];
	getProxyFactory.$inject = inject;

    function getProxyFactory(){

		/**
		 * Public method that are accessible
		 * @type {Object}
		 */
		var ret = {

		};
		return ret;

    }

})();