(function(){
	'use strict';
	
    /**
     * @name StorageFactory
     * @description Factory that offer methods relative to the session/local storage
     * @memberof ag.tech
     */

    angular.module('ag.tech').factory('StorageFactory', getStorageFactory);
    
	var inject = ['$localStorage', '$rootScope', '$q'];
	getStorageFactory.$inject = inject;

    function getStorageFactory($localStorage, $rootScope, $q){

		/**
		 * Public method that are accessible
		 * @type {Object}
		 */
		var ret = {
			addOrUpdateUserInLocalStorage: addOrUpdateUserInLocalStorage,
            removeUserFromLocalStorage: removeUserFromLocalStorage,
            isUserOnline : isUserOnline,
            getUserFromLocalStorage: getUserFromLocalStorage
		};
		return ret;

		// Add or Update users data in the localStorage
		function addOrUpdateUserInLocalStorage(user){
			if(user){
	        	$localStorage.user = user;
	            $rootScope.root.user = $localStorage.user;
	        }
		}

		// Remove users data from the localStorage
		function removeUserFromLocalStorage(){
	        delete $localStorage.user;
	        delete $rootScope.root.user;
	    }
        
        function getUserFromLocalStorage(){
            return $localStorage.user;
        }
        
        // Check if the user data are in the localStorage
	    function isUserOnline(){
	    	return $q(function(resolve, reject) {
		      if($localStorage.user && $rootScope.root.user) {
		        resolve();
		      } else {
		        reject();
		      }
		  	});
	    }

    }

})();