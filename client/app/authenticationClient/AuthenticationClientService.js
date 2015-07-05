/**
 * @Type        : Service
 * @Name        : AuthenticationClientService
 * @Description : Ce service offre les méthodes relatives à l'authentification
 *                utilisateur
 */
agilogClient.service("AuthenticationClientService", ['$localStorage', '$rootScope', "$http",
function($localStorage, $rootScope, $http){

	/**
	 * Méthode permettant de soumettre les données du
	 * formulaire d'enregistrement
	 */
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

	/**
	 * Méthode permettant de soumettre les données du
	 * formulaire d'authentification
	 */
	this.submitLoginForm = function(arrayOfUserData, callback){
		$http.post("/auth/login", {
			usrLogin:     arrayOfUserData.usrLogin,
			usrPassword:  arrayOfUserData.usrPassword
		})
		.then(function(response){
			callback(response.data.message, response.data.user);
		});
	};

	/**
	 * Méthode permettant d'ajouter / modifier le user
	 * dans le localStorage ainsi que dans le scope global
	 */
	this.addOrUpdateUserInLocalStorage = function(user){
		if(user){
        	$localStorage.user = user;
            $rootScope.root.user = $localStorage.user;
        }
	};

	/**
	 * Méthode permettant de supprimer le user
	 * dans le localStorage ainsi que dans le scope global
	 */
	this.removeUserFromLocalStorage = function(){
        delete $localStorage.user;
        delete $rootScope.root.user;
    };

    /**
	 * Méthode envoyant la demande de déconnexion
	 * au serveur
	 */
    this.logout = function(){
    	return $http.get("/auth/logout");
    }

}]);