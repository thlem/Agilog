agilogClient.directive("usrAccountLoginDir", ["NotificationClientService", "AccountClientService", "AuthenticationClientService", "$location", "$rootScope",
function(NotificationClientService, AccountClientService, AuthenticationClientService, $location, $rootScope){
		return function(scope, element) {

			element.on("submit", function(){
				console.log("ok");
				$rootScope.startLoading();

				var usrLoginVal = $(this).find("#usrLogin").val();
				var usrPasswordVal = $(this).find("#usrPassword").val();
				var usrPasswordConfirmVal = $(this).find("#usrPasswordConfirm").val();

				var doSubmit = true;

				if(usrPasswordVal !== undefined && usrPasswordVal !== ""){
					if(usrPasswordConfirmVal !== undefined && usrPasswordVal !== usrPasswordConfirmVal){
						doSubmit = false;
						$(this).find("#usrPassword").focus();
						NotificationClientService.addToErrorMessages("Les mots de passe saisis ne sont pas identiques");
					}
				}

				if(doSubmit){
					var arrayOfUserData = {
						usrLogin:$(this).find("#usrLogin").val(),
						usrPassword:$(this).find("#usrPassword").val()
					}

					AccountClientService.submitAccountLoginInfoForm(arrayOfUserData, function(message, user){
						if(user){
							AuthenticationClientService.addOrUpdateUserInLocalStorage(user);
							NotificationClientService.addToSuccessMessages(message);
						}
						else{
							NotificationClientService.addToErrorMessages(message);
						}
						$rootScope.endLoading();
					});

				}

			});

		}
}]);