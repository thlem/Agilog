(function(){
	'use strict';
/**
 * @Type        : Directive
 * @Name        : registerFormDir
 * @Usage       : <balise register-form-dir></balise>
 * @Description : Cette directive gère côté JS les événements 
 *                utilisateur liés au formulaire d'enregistrement
 */
angular.module("agilog").directive("registerFormDir", ["NotificationClientService", "AuthenticationFactory", "$location", "$rootScope",
function(NotificationClientService, AuthenticationFactory, $location, $rootScope){

	return function(scope, element) {

		// On empêche l'accès à un utilisateur déjà authentifié
		if($rootScope.root.user){
			$location.url('/');
		}

		var registerForm = $(element[0]);
		var usrLoginInput = $(registerForm).find("#usrLogin");

		// Au premier affichage de la page si une valeur
		// est déjà présente dans le champ login on met le 
		// focus sur le champ password
		if(usrLoginInput.val()){
			var usrPasswordInput = $(registerForm).find("#usrPassword");
			usrPasswordInput.focus();
		}
		// Sinon on met le focus sur le champ login
		else{
			usrLoginInput.focus();
		}

		// A la soumission du formulaire
		element.on("submit", function(){
			$rootScope.startLoading();

			// On supprime la class css d'erreur
			$(".inputError").removeClass("inputError");

			// Si des erreurs sont présentes dans le formulaire
			if(!scope.registerForm.$valid){

				var usrMailLabel = $(this).find("label[for='usrMail']");
				usrMailLabel.text("Mail");
				var focusIsSet = false;

				// Si le login n'est pas présent
				if(scope.registerForm.usrLogin.$error.required){
					var usrLoginInput = $(this).find("#usrLogin");

					// On ajoute la class d'erreur
					usrLoginInput.addClass("inputError");
					// On met le focus dessus
					focusIsSet = true;
					usrLoginInput.focus();
				}

				// Si le password n'est pas présent
				if(scope.registerForm.usrPassword.$error.required){
					var usrPasswordInput = $(this).find("#usrPassword");
					
					// On ajoute la class d'erreur
					usrPasswordInput.addClass("inputError");
					// Si le focus n'a pas été précisé plus haut
					if(!focusIsSet){
						// On met le focus dessus
						focusIsSet = true;
						usrPasswordInput.focus();
					}
				}

				// Si la confirmation du password n'est pas présente
				if(scope.registerForm.usrPasswordConfirm.$error.required){
					var usrPasswordConfirmInput = $(this).find("#usrPasswordConfirm");
					
					// On ajoute la class d'erreur
					usrPasswordConfirmInput.addClass("inputError");
					// Si le focus n'a pas été précisé plus haut
					if(!focusIsSet){
						// On met le focus dessus
						focusIsSet = true;
						usrPasswordConfirmInput.focus();
					}
				}
				// Si le format du mail n'est pas bon
				if(scope.registerForm.usrMail.$error){
					var usrMailInput = $(this).find("#usrMail");
					if(usrMailInput.val()){
						var usrMailLabel = $(this).find("label[for='usrMail']");

						// On ajoute la class d'erreur
						usrMailInput.addClass("inputError");
						// On modifie le label pour indiquer l'erreur
						usrMailLabel.append(" E-mail invalide (example@examp.ex)");
						// Si le focus n'a pas été précisé plus haut
						if(!focusIsSet){
							// On met le focus dessus
							focusIsSet = true;
							usrMailInput.focus();
						}
					}
				}
				$rootScope.endLoading();
			}
			// Si le formulaire est valide
			else{
				var usrPasswordConfirmInput = $(this).find("#usrPasswordConfirm");
				var usrPasswordInput = $(this).find("#usrPassword");

				var password = scope.user.usrPassword;
				var confirmPassword = scope.user.usrPasswordConfirm;

				// On vérifie que les password correspondent
				// Si ils ne correspondent pas
				if(password !== confirmPassword){

					NotificationClientService.addToErrorMessages("Les mots de passe saisis ne sont pas identiques");
					var usrPasswordConfirmLabel = $(usrPasswordConfirmInput.siblings()[0]);
					var usrPasswordLabel = $(usrPasswordInput.siblings()[0]);

					usrPasswordConfirmLabel.removeClass("labelOnBottom");
					usrPasswordLabel.removeClass("labelOnBottom");

					usrPasswordConfirmInput.addClass("inputError");
					usrPasswordInput.addClass("inputError");

					usrPasswordInput.val("");
					usrPasswordConfirmInput.val("");
					$(usrPasswordInput).focus();
					$rootScope.endLoading();
					scope.$apply();
				}
				// Si les password correspondent
				else{

					// On construit l'objet json transmis
					var arrayOfUserData = {
						usrLogin:scope.user.usrLogin,
						usrPassword:scope.user.usrPassword,
						usrMail:scope.user.usrMail,
						usrFirstName:scope.user.usrFirstName,
						usrLastName:scope.user.usrLastName
					}
					
					// On soumet les données du formulaire via le service
					AuthenticationClientFactory.submitRegisterForm(arrayOfUserData, function(message, user){
						// Si le user a été retourné
						if(user){
							// On l'ajoute au localStorage et au scope Global
							AuthenticationClientFactory.addOrUpdateUserInLocalStorage(user);
							NotificationClientService.addToSuccessMessages(message);
							$rootScope.endLoading();
							// On redirige vers l'accueil
							$location.url('/');
						}
						// Sinon une erreur est survenue
						else{
							NotificationClientService.addToErrorMessages(message);
							var usrLoginInput = $(this).find("#usrLogin");
							usrLoginInput.focus();
							$rootScope.endLoading();
						}
					});
				}
			}
		});
	}

}]);

/**
 * @Type        : Directive
 * @Name        : loginFormDir
 * @Usage       : <balise login-form-dir></balise>
 * @Description : Cette directive gère côté JS les événements 
 *                utilisateur liés au formulaire d'authentification
 */
angular.module("agilog").directive("loginFormDir", ["NotificationClientService", "AuthenticationClientFactory", "$location", "$rootScope",
function(NotificationClientService, AuthenticationClientFactory, $location, $rootScope){
	return function(scope, element) {

		if($rootScope.root.user){
			$location.url("/");
		}

		var loginForm = $(element[0]);
		var usrLoginInput = $(loginForm).find("#usrLogin");
		if(usrLoginInput.val()){
			var usrPasswordInput = $(loginForm).find("#usrPassword");
			usrPasswordInput.focus();
		}
		else{
			usrLoginInput.focus();
		}

		element.on("submit", function(){
			$rootScope.startLoading();

			$(".inputError").removeClass("inputError");

			if(!scope.loginForm.$valid){
				var usrMailLabel = $(loginForm).find("label[for='usrMail']");
				usrMailLabel.text("Mail");
				var focusIsSet = false;
				if(scope.loginForm.usrLogin.$error.required){
					var usrLoginInput = $(loginForm).find("#usrLogin");

					usrLoginInput.addClass("inputError");
					focusIsSet = true;
					usrLoginInput.focus();
				}
				if(scope.loginForm.usrPassword.$error.required){
					var usrPasswordInput = $(loginForm).find("#usrPassword");

					usrPasswordInput.addClass("inputError");
					if(!focusIsSet){
						focusIsSet = true;
						usrPasswordInput.focus();
					}
				}
				$rootScope.endLoading();
			}
			else{

				var arrayOfUserData = {
					usrLogin:$(loginForm).find("#usrLogin").val(),
					usrPassword:$(loginForm).find("#usrPassword").val()
				}
				
				AuthenticationClientFactory.submitLoginForm(arrayOfUserData, function(message, user){
					if(user){
						AuthenticationClientFactory.addOrUpdateUserInLocalStorage(user);
						NotificationClientService.addToSuccessMessages(message);
						$rootScope.endLoading();
						$location.url('/');
					}
					else{
						NotificationClientService.addToErrorMessages(message);
						var usrLoginInput = $(loginForm).find("#usrLogin");
						usrLoginInput.focus();
						$rootScope.endLoading();
					}
				});
			}
		});
	}
}]);
})();