(function(){
	'use strict';


	angular.module('agilogClient').directive('authenticationRegisterFormDir', getAuthenticationRegisterFormDir);

	var inject = ['NotificationClientService', 'AuthenticationFactory', 'UrlConstant',
				'UrlFactory', 'ErrorMessageConstant', '$location', '$rootScope'];

	getAuthenticationRegisterFormDir.$inject = inject;

	function getAuthenticationRegisterFormDir(
		NotificationClientService, AuthenticationFactory, UrlConstant, 
			UrlFactory, ErrorMessageConstant, $location, $rootScope){

		return{
			restrict:'A',
			link:function(scope, element, attrs){

				// Restrict access to unlogged only
				AuthenticationFactory.isUserLogged()
				.then(function(){
					// If the user is not logged in
					var registerForm 			= $(element[0]),
						registerInputList = {
							usrLoginInput 			: $(registerForm.find('#usrLogin')),
							usrPasswordInput 		: $(registerForm.find('#usrPassword')),
							usrPasswordConfirmInput : $(registerForm.find('#usrPasswordConfirm')),
							usrMailInput 			: $(registerForm.find('#usrMail')),
							usrFirstNameInput		: $(registerForm.find('#usrFirstName')),
							usrLastNameInput		: $(registerForm.find('#usrLastName'))
						};
					
					// Clear the form
					$.each(registerInputList, function(inputKey, inputElment){
						$(inputElment).val('');
					});

					// On the page displayed if the usrLogin input contains
					// a value then we set the focus on the usrPassword input
					if(registerInputList.usrLoginInput.val()){
						registerInputList.usrPasswordInput.focus();
					}
					else{
						registerInputList.usrLoginInput.focus();
					}

					// On register form submit
					registerForm.on('submit', function(){
						// start the loading spinner
						$rootScope.startLoading();
						// Clear error class
						$('.inputError').removeClass('inputError');

						// Check form validity
						if(!scope.registerForm.$valid){
							// Reset the mail label if an error was displayed
							var usrMailLabel = registerForm.find('label[for='usrMail']');
							usrMailLabel.text('Mail');
							// Reset the focus
							var focusIsSet = false;

							// If the login is missing
							if(scope.registerForm.usrLogin.$error.required){
								// Add class that show error on the field
								registerInputList.usrLoginInput.addClass('inputError');
								// Set the focus on this field
								focusIsSet = true;
								registerInputList.usrLoginInput.focus();
							}

							// If the password is missing
							if(scope.registerForm.usrPassword.$error.required){
								// Add class that show error on the field
								registerInputList.usrPasswordInput.addClass('inputError');
								// If the focus is not yet set
								if(!focusIsSet){
									// Set the focus on this field
									focusIsSet = true;
									registerInputList.usrPasswordInput.focus();
								}
							}

							// If passwordConfirm is missing
							if(scope.registerForm.usrPasswordConfirm.$error.required){
								// Add class that show error on the field
								registerInputList.usrPasswordConfirmInput.addClass('inputError');
								// If the focus is not yet set
								if(!focusIsSet){
									// Set the focus on this field
									focusIsSet = true;
									registerInputList.usrPasswordConfirmInput.focus();
								}
							}

							// If the mail is not correct
							// Don't check if missing, mail is optional
							if(scope.registerForm.usrMail.$error){
								// Prevent potentially null value
								if(registerInputList.usrMailInput.val()){
									// Get the mail label
									var usrMailLabel = registerForm.find('label[for=\'usrMail\']');
									// Add class that show error on the field
									registerInputList.usrMailInput.addClass('inputError');
									// Change label value
									usrMailLabel.append(' E-mail invalide (example@examp.ex)');
									// If the focus is not yet set
									if(!focusIsSet){
										// Set the focus on this field
										focusIsSet = true;
										registerInputList.usrMailInput.focus();
									}
								}
							}

							// End of check stop loading
							$rootScope.endLoading();
						}
						// If no error in the register form
						else{
							// Get the value of the password and the confirm
							var password 		= scope.user.usrPassword,
								confirmPassword = scope.user.usrPasswordConfirm;

							// If passwords are different
							if(password !== confirmPassword){
								// Notify the user
								NotificationClientService.addToErrorMessages(
									ErrorMessageConstant.REGISTER_PASSWORDS_WRONG);

								// Get both label for animation
								var usrPasswordConfirmLabel = 
										$(registerInputList.usrPasswordConfirmInput.siblings()[0]),
									usrPasswordLabel 		= 
										$(registerInputList.usrPasswordInput.siblings()[0]);

								// Remove the class that display label at the bottom
								usrPasswordConfirmLabel.removeClass('labelOnBottom');
								usrPasswordLabel.removeClass('labelOnBottom');
								// Add the error class
								registerInputList.usrPasswordConfirmInput.addClass('inputError');
								registerInputList.usrPasswordInput.addClass('inputError');
								// Clear content of both input
								registerInputList.usrPasswordInput.val('');
								registerInputList.usrPasswordConfirmInput.val('');
								// Set the focus on the password field
								registerInputList.usrPasswordInput.focus();
								// End of verification, stop loading
								$rootScope.endLoading();

								//scope.$apply();
							}
							// If passwords are ok
							else{
								// Build of the json object that will be send to the server
								var arrayOfUserData = {
									usrLogin:scope.user.usrLogin,
									usrPassword:scope.user.usrPassword,
									usrMail:scope.user.usrMail,
									usrFirstName:scope.user.usrFirstName,
									usrLastName:scope.user.usrLastName
								};

								// Start server submit
								AuthenticationFactory.submitRegisterForm(arrayOfUserData)
								.then(function(responseData){
									if(responseData.user){
										AuthenticationFactory.addOrUpdateUserInLocalStorage(responseData.user);
										NotificationClientService.addToSuccessMessages(responseData.message);
										$rootScope.endLoading();
										UrlFactory.redirect(UrlConstant.HOME);
									}
								})
								.catch(function(responseData){
									NotificationClientService.addToErrorMessages(responseData.message);
									var usrLoginInput = $(this).find('#usrLogin');
									usrLoginInput.focus();
									$rootScope.endLoading();
								});
							}

						}

					});

				})
				.catch(function(error){
					UrlFactory.redirect(UrlConstant.HOME);
				});

			}
		};
	}
})();