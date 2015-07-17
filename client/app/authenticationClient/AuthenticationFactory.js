(function(){
	'use strict';

	/**
	 * @desc: This service offers methods used by authentification and register form
	 */

	angular.module('agilog').factory('AuthenticationFactory', getAuthenticationFactory);

	getAuthenticationFactory.$inject = ['$localStorage', '$rootScope', '$http', '$q'];

	
	function getAuthenticationFactory($localStorage, $rootScope, $http, $q){

		// Visible methods
		var service = {
			submitRegisterForm: 			submitRegisterForm,
			submitLoginForm: 				submitLoginForm,
			addOrUpdateUserInLocalStorage: 	addOrUpdateUserInLocalStorage,
			removeUserFromLocalStorage: 	removeUserFromLocalStorage,
			logout: 						logout,
			isUserNotLogged: 				isUserNotLogged
		};
		return service;

		// Submit register form data to the server
		function submitRegisterForm(arrayOfUserData){
			return $q(function(resolve, reject) {

				$http.post('/auth/register', {
					usrLogin:     arrayOfUserData.usrLogin,
					usrPassword:  arrayOfUserData.usrPassword,
					usrMail:      arrayOfUserData.usrMail,
					usrFirstName: arrayOfUserData.usrFirstName,
					usrLastName:  arrayOfUserData.usrLastName
				})
				.then(function(response){
					resolve(response.data);
				})
				.catch(function(response){
					reject(response.data);
				});
			});
		}

		// Submit login form data to the server
		function submitLoginForm(arrayOfUserData, callback){
			$http.post('/auth/login', {
				usrLogin:     arrayOfUserData.usrLogin,
				usrPassword:  arrayOfUserData.usrPassword
			})
			.then(function(response){
				callback(response.data.message, response.data.user);
			});
		}

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

	    // Send to the server the request to logout the user
	    function logout(){
	    	return $http.get('/auth/logout');
	    }

	    // Check if the user data are in the localStorage
	    function isUserNotLogged(){
	    	return $q(function(resolve, reject) {
		      if($localStorage.user && $rootScope.root.user) {
		        reject();
		      } else {
		        resolve();
		      }
		  });
	    }
	}
})();