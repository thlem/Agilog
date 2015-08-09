(function(){
	'use strict';
/**
 * @Type        : Service
 * @Name        : AccountClientService
 * @Description : Ce service offre les méthodes relatives à la gestion de 
 *                compte utilisateur
 */
angular.module("agilog").service("AccountClientService", ['$localStorage', '$rootScope', "$http",
function($localStorage, $rootScope, $http){

	/**
	 * Méthode permettant de soumettre la mise à jour des informations
	 * de connexion de l'utilisateur
	 */
	this.submitAccountLoginInfoForm = function(arrayOfUserData, callback){
		// Appel POST au serveur en passant en paramètre le login et le pwd
		$http.post("/account/update/logininfo", {
			usrLogin:     arrayOfUserData.usrLogin,
			usrPassword:  arrayOfUserData.usrPassword
		})
		.then(function(response){
			callback(response.data.message, response.data.user);
		});
	};

	this.submitAccountPersonalInfoForm = function(arrayOfUserData, callback){
		// Appel POST au serveur en passant en paramètre le login et le pwd
		$http.post("/account/update/personalinfo", {
			usrFirstName:arrayOfUserData.usrFirstName,
			usrLastName:arrayOfUserData.usrLastName,
			usrMail:arrayOfUserData.usrMail
		})
		.then(function(response){
			callback(response.data.message, response.data.user);
		});
	};

}]);
})();