(function(){
	'use strict';


/**
 * @Type        : Directive
 * @Name        : loginFormDir
 * @Usage       : <balise login-form-dir></balise>
 * @Description : Cette directive gère côté JS les événements 
 *                utilisateur liés au formulaire d'authentification
 */
angular.module("agilog").directive("loginFormDir", ["NotificationFactory", "AuthenticationClientFactory", "$location", "$rootScope",
function(NotificationFactory, AuthenticationClientFactory, $location, $rootScope){
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
						NotificationFactory.addToSuccessMessages(message);
						$rootScope.endLoading();
						$location.url('/');
					}
					else{
						NotificationFactory.addToErrorMessages(message);
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