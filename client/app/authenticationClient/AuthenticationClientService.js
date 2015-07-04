agilogClient.service("AuthenticationClientService", ['$localStorage', '$rootScope', "$http",
function($localStorage, $rootScope, $http){

	this.submitRegisterForm = function(arrayOfUserData, callback){
		$http.post("/auth/register", {
			usrLogin:     arrayOfUserData.usrLogin,
			usrPassword:  arrayOfUserData.usrPassword,
			usrMail:      arrayOfUserData.usrMail,
			usrFirstName: arrayOfUserData.usrFirstName,
			usrLastName:  arrayOfUserData.usrLastName
		})
		.then(function(response){
			callback(response.data.message, response.data.user);
		});
	};

	this.submitLoginForm = function(arrayOfUserData, callback){
		$http.post("/auth/login", {
			usrLogin:     arrayOfUserData.usrLogin,
			usrPassword:  arrayOfUserData.usrPassword
		})
		.then(function(response){
			callback(response.data.message, response.data.user);
		});
	};

	this.addOrUpdateUserInLocalStorage = function(user){
		if(user){
        	$localStorage.user = user;
            $rootScope.root.user = $localStorage.user;
        }
	};

	this.removeUserFromLocalStorage = function(){
        delete $localStorage.user;
        delete $rootScope.root.user;
    };

    this.logout = function(){
    	return $http.get("/auth/logout");
    }

}]);