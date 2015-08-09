(function(){
	'use strict';
	
    /**
     * @name StorageFactory
     * @description Factory that offer methods relative to the session/local storage
     * @memberof ag.tech
     */

    angular.module('ag.tech').factory('StorageFactory', getStorageFactory);
    
	var inject = [];
	getStorageFactory.$inject = inject;

    function getStorageFactory(){

		/**
		 * Public method that are accessible
		 * @type {Object}
		 */
		var ret = {

		};
		return ret;

    }

})();