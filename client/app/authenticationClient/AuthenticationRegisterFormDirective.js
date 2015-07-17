(function(){
	'use strict';

	/**
	 * @desc: Directive relating to the register form
	 */

	angular.module('agilog').directive('authenticationRegisterFormDir', getAuthenticationRegisterFormDir);

	var inject = ['NotificationClientService', 'AuthenticationFactory', 'UrlConstant',
				'UrlFactory', 'ErrorMessageConstant', '$location', '$rootScope'];

	getAuthenticationRegisterFormDir.$inject = inject;

	function getAuthenticationRegisterFormDir(
		NotificationClientService, AuthenticationFactory, UrlConstant, 
			UrlFactory, ErrorMessageConstant, $location, $rootScope){

		return{
			restrict:'A',
			controller:'AuthenticationRegisterController as AuthCtrl',
			link:function(scope, element, attrs, AuthCtrl){

				// Restrict access to unlogged only
				AuthenticationFactory.isUserNotLogged()
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
							var usrMailLabel = registerForm.find('label[for=\'usrMail\']');
							usrMailLabel.text('Mail');
							
								// Initialize the focus
							var focusAlreadySet 				= false,
								// Get different errors of the form
								loginRequiredError 				= scope.registerForm.usrLogin.$error.required,
								passwordRequiredError 			= scope.registerForm.usrPassword.$error.required,
								passwordConfirmRequiredError 	= 
									scope.registerForm.usrPasswordConfirm.$error.required,
								mailPatternError				= scope.registerForm.usrMail.$error;

							// Check if the login is missing
							focusAlreadySet = handleInputError(loginRequiredError,
								registerInputList.usrLoginInput, focusAlreadySet);
							// Check if the password is missing
							focusAlreadySet = handleInputError(
								passwordRequiredError, registerInputList.usrPasswordInput, focusAlreadySet);
							// Check if the passwordConfirm is missing
							focusAlreadySet = handleInputError(passwordConfirmRequiredError,
								registerInputList.usrPasswordConfirmInput, focusAlreadySet);
							// Check if the mail is correct
							focusAlreadySet = handleInputError(
								mailPatternError, registerInputList.usrMailInput, focusAlreadySet);

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
								AuthCtrl.submitRegisterForm(arrayOfUserData);
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

	// Handle error of input elements
	function handleInputError(error, input, focus){
		// If the scope input element contains an error
		if(error){
			// Add class that show error on the field
			input.addClass('inputError');
			// If the focus is not yet set
			if(!focus){
				// Set the focus on this field
				focus = true;
				input.focus();
			}
		}
		return focus;
	}
})();