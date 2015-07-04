agilogClient.service("AccountClientService", ['$localStorage', '$rootScope', "$http",
function($localStorage, $rootScope, $http){

	this.submitAccountLoginInfoForm = function(arrayOfUserData, callback){
		$http.post("/account/update/logininfo", {
			usrLogin:     arrayOfUserData.usrLogin,
			usrPassword:  arrayOfUserData.usrPassword
		})
		.then(function(response){
			callback(response.data.message, response.data.user);
		});
	};

}]);