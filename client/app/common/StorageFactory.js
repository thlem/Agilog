(function(){
	'use strict';

	/**
	 * @desc: Factory that offers method relative to the url
	 */

	angular.module('agilog').factory('StorageFactory', getStorageFactory);

	var inject = ['$rootScope', '$q', '$localStorage'];

	getStorageFactory.$inject = inject;

	function getStorageFactory($rootScope, $q, $localStorage){
		
		// Visible methods
		var service = {
			addOrUpdateUserInLocalStorage: addOrUpdateUserInLocalStorage,
            removeUserFromLocalStorage: removeUserFromLocalStorage,
            isUserOnline : isUserOnline,
            getUserFromLocalStorage: getUserFromLocalStorage
		};

		return service;

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