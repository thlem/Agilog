agilogClient.directive("registerFormDir", ["NotificationClientService", "AuthenticationClientService", "$location", "$rootScope",
function(NotificationClientService, AuthenticationClientService, $location, $rootScope){

	return function(scope, element) {

		if($rootScope.root.user){
			$location.url('/');
		}

		var registerForm = $(element[0]);
		var usrLoginInput = $(registerForm).find("#usrLogin");
		if(usrLoginInput.val()){
			var usrPasswordInput = $(registerForm).find("#usrPassword");
			usrPasswordInput.focus();
		}
		else{
			usrLoginInput.focus();
		}

		element.on("submit", function(){
			$rootScope.startLoading();

			$(".inputError").removeClass("inputError");

			if(!scope.registerForm.$valid){
				var usrMailLabel = $(registerForm).find("label[for='usrMail']");
				usrMailLabel.text("Mail");
				var focusIsSet = false;
				if(scope.registerForm.usrLogin.$error.required){
					var usrLoginInput = $(registerForm).find("#usrLogin");

					usrLoginInput.addClass("inputError");
					focusIsSet = true;
					usrLoginInput.focus();
				}
				if(scope.registerForm.usrPassword.$error.required){
					var usrPasswordInput = $(registerForm).find("#usrPassword");

					usrPasswordInput.addClass("inputError");
					if(!focusIsSet){
						focusIsSet = true;
						usrPasswordInput.focus();
					}
				}
				if(scope.registerForm.usrPasswordConfirm.$error.required){
					var usrPasswordConfirmInput = $(registerForm).find("#usrPasswordConfirm");

					usrPasswordConfirmInput.addClass("inputError");
					if(!focusIsSet){
						focusIsSet = true;
						usrPasswordConfirmInput.focus();
					}
				}
				if(scope.registerForm.usrMail.$error){
					var usrMailInput = $(registerForm).find("#usrMail");
					if(usrMailInput.val()){
						var usrMailLabel = $(registerForm).find("label[for='usrMail']");

						usrMailInput.addClass("inputError");
						usrMailLabel.append(" E-mail invalide (example@examp.ex)");
						if(!focusIsSet){
							focusIsSet = true;
							usrMailInput.focus();
						}
					}
				}
				$rootScope.endLoading();
			}
			else{
				var usrPasswordConfirmInput = $(registerForm).find("#usrPasswordConfirm");
				var usrPasswordInput = $(registerForm).find("#usrPassword");

				var password = usrPasswordInput.val();
				var confirmPassword = usrPasswordConfirmInput.val();

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
				else{

					var arrayOfUserData = {
						usrLogin:$(registerForm).find("#usrLogin").val(),
						usrPassword:$(registerForm).find("#usrPassword").val(),
						usrMail:$(registerForm).find("#usrMail").val(),
						usrFirstName:$(registerForm).find("#usrFirstName").val(),
						usrLastName:$(registerForm).find("#usrLastName").val()
					}
					
					AuthenticationClientService.submitRegisterForm(arrayOfUserData, function(message, user){
						if(user){
							AuthenticationClientService.addOrUpdateUserInLocalStorage(user);
							NotificationClientService.addToSuccessMessages(message);
							$rootScope.endLoading();
							$location.url('/');
						}
						else{
							NotificationClientService.addToErrorMessages(message);
							var usrLoginInput = $(registerForm).find("#usrLogin");
							usrLoginInput.focus();
							$rootScope.endLoading();
						}
					});
				}
			}
		});
	}

}]);

agilogClient.directive("loginFormDir", ["NotificationClientService", "AuthenticationClientService", "$location", "$rootScope",
function(NotificationClientService, AuthenticationClientService, $location, $rootScope){
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
				
				AuthenticationClientService.submitLoginForm(arrayOfUserData, function(message, user){
					if(user){
						AuthenticationClientService.addOrUpdateUserInLocalStorage(user);
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