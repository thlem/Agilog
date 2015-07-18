(function(){
	'use strict';
/**
 * @Type        : Directive
 * @Name        : usrAccountLoginDir
 * @Usage       : <balise usr-account-login-dir></balise>
 * @Description : Cette directive gère côté JS les événements 
 *                utilisateur liés au formulaire de modification des
 *				  informations de connexion du compte
 */
angular.module("agilog").directive("usrAccountLoginDir", ["NotificationFactory", "AccountClientService", "AuthenticationClientService", "$location", "$rootScope",
function(NotificationFactory, AccountClientService, AuthenticationClientService, $location, $rootScope){
		return function(scope, element) {

			// A la soumission du formulaire
			element.on("submit", function(){

					console.log(scope.user);

				$rootScope.startLoading();

				var doSubmit = true;

				// Si les mots de passe ont été saisis
				if(scope.user.usrPassword !== undefined && scope.user.usrPassword !== ""){
					// Si les mots de passe ne correspondent pas
					if(scope.user.usrPasswordConfirm !== undefined
						&& scope.user.usrPassword !== scope.user.usrPasswordConfirm){
						// On empêche la soumission du formulaire
						doSubmit = false;
						$(this).find("#usrPassword").focus();
						NotificationFactory.addToErrorMessages("Les mots de passe saisis ne sont pas identiques");
					}
				}

				if(doSubmit){
					var arrayOfUserData = {
						usrLogin:scope.user.usrLogin,
						usrPassword:scope.user.usrPassword
					}

					// Appel au service afin de soumettre le formulaire au serveur
					AccountClientService.submitAccountLoginInfoForm(arrayOfUserData, function(message, user){
						// Si le user a bien été retourné
						if(user){
							// On met à jour le localstorage
							AuthenticationClientService.addOrUpdateUserInLocalStorage(user);
							NotificationFactory.addToSuccessMessages(message);
						}
						// Si le user n'a pas été retourné on affiche le message d'erreur
						else{
							NotificationFactory.addToErrorMessages(message);
						}
						$rootScope.endLoading();
					});

				}
				else{
					$rootScope.endLoading();
				}

			});

		}
}]);

/**
 * @Type        : Directive
 * @Name        : usrAccountLoginDir
 * @Usage       : <balise usr-account-login-dir></balise>
 * @Description : Cette directive gère côté JS les événements 
 *                utilisateur liés au formulaire de modification des
 *				  informations de connexion du compte
 */
angular.module("agilog").directive("usrAccountPersonalDir", ["NotificationFactory", "AccountClientService", "AuthenticationClientService", "$location", "$rootScope",
function(NotificationFactory, AccountClientService, AuthenticationClientService, $location, $rootScope){
		return function(scope, element) {
			element.on("submit", function(){
				$(".inputError").removeClass("inputError");
				$rootScope.startLoading();


				if(!scope.userAccountPersonalInfo.$valid
					&& scope.userAccountPersonalInfo.usrMail.$error){
					var usrMailInput = $(this).find("#usrMail");
					if(scope.user.usrMail !== ""){
						// On ajoute la class d'erreur
						usrMailInput.addClass("inputError");
						// Si le focus n'a pas été précisé plus haut
						usrMailInput.focus();
					}
					$rootScope.endLoading();
				}
				else{
					var arrayOfUserData = {
						usrFirstName:scope.user.usrFirstName,
						usrLastName:scope.user.usrLastName,
						usrMail:scope.user.usrMail
					}

					// Appel au service afin de soumettre le formulaire au serveur
					AccountClientService.submitAccountPersonalInfoForm(arrayOfUserData, function(message, user){
						// Si le user a bien été retourné
						if(user){
							// On met à jour le localstorage
							AuthenticationClientService.addOrUpdateUserInLocalStorage(user);
							NotificationFactory.addToSuccessMessages(message);
						}
						// Si le user n'a pas été retourné on affiche le message d'erreur
						else{
							NotificationFactory.addToErrorMessages(message);
						}
						$rootScope.endLoading();
					});
				}
			});
		}
}]);
})();