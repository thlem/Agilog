(function() {
    'use strict';

    /**
     * @name authenticationRegisterFormDir
     * @description The directive relative to the register form
     * @memberof ag.acc.auth
     */

    angular.module('ag.acc.auth').directive('authenticationRegisterFormDir', getAuthenticationRegisterFormDir);

    var inject = ['NotificationFactory', 'ErrorMessageConstant', '$location', '$rootScope'];

    getAuthenticationRegisterFormDir.$inject = inject;

    function getAuthenticationRegisterFormDir(NotificationFactory, ErrorMessageConstant,
        $location, $rootScope) {
        return {
            restrict: 'A',
            controller: 'AuthenticationRegisterController as AuthCtrl',
            link: function(scope, element, attrs, AuthCtrl) {

                var registerForm = $(element[0]),
                    registerInputList = {
                        userLoginInput: $(registerForm.find('#userLogin')),
                        userPasswordInput: $(registerForm.find('#userPassword')),
                        userPasswordConfirmInput: $(registerForm.find('#userPasswordConfirm')),
                        userMailInput: $(registerForm.find('#userMail')),
                        userFirstNameInput: $(registerForm.find('#userFirstName')),
                        userLastNameInput: $(registerForm.find('#userLastName'))
                    };

                // Clear the form
                $.each(registerInputList, function(inputKey, inputElment) {
                    $(inputElment).val('');
                });

                // On the page displayed if the userLogin input contains
                // a value then we set the focus on the userPassword input
                if (registerInputList.userLoginInput.val()) {
                    registerInputList.userPasswordInput.focus();
                } else {
                    registerInputList.userLoginInput.focus();
                }

                // On register form submit
                registerForm.on('submit', function() {
                    // start the loading spinner
                    // Clear error class
                    $('.inputError').removeClass('inputError');

                    // Check form validity
                    if (!scope.registerForm.$valid) {
                        // Reset the mail label if an error was displayed
                        var userMailLabel = registerForm.find('label[for=\'userMail\']');
                        userMailLabel.text('Mail');

                        // Initialize the focus
                        var focusAlreadySet = false,
                            // Get different errors of the form
                            loginRequiredError = scope.registerForm.userLogin.$error.required,
                            passwordRequiredError = scope.registerForm.userPassword.$error.required,
                            passwordConfirmRequiredError =
                            scope.registerForm.userPasswordConfirm.$error.required,
                            mailPatternError = scope.registerForm.userMail.$error;

                        // Check if the login is missing
                        focusAlreadySet = handleInputError(loginRequiredError,
                            registerInputList.userLoginInput, focusAlreadySet);
                        // Check if the password is missing
                        focusAlreadySet = handleInputError(
                            passwordRequiredError, registerInputList.userPasswordInput, focusAlreadySet);
                        // Check if the passwordConfirm is missing
                        focusAlreadySet = handleInputError(passwordConfirmRequiredError,
                            registerInputList.userPasswordConfirmInput, focusAlreadySet);
                        // Check if the mail is correct
                        focusAlreadySet = handleInputError(
                            mailPatternError, registerInputList.userMailInput, focusAlreadySet);
                    }
                    // If no error in the register form
                    else {
                        // Get the value of the password and the confirm
                        var password = scope.user.userPassword,
                            confirmPassword = scope.user.userPasswordConfirm;

                        // If passwords are different
                        if (password !== confirmPassword) {

                            // Notify the user
                            NotificationFactory.addToErrorMessages(
                                ErrorMessageConstant.PASSWORD_CONFIRM_NOT_IDENTICAL);

                            // Get both label for animation
                            var userPasswordConfirmLabel =
                                $(registerInputList.userPasswordConfirmInput.siblings()[0]),
                                userPasswordLabel =
                                $(registerInputList.userPasswordInput.siblings()[0]);

                            // Remove the class that display label at the bottom
                            userPasswordConfirmLabel.removeClass('labelOnBottom');
                            userPasswordLabel.removeClass('labelOnBottom');
                            // Add the error class
                            registerInputList.userPasswordConfirmInput.addClass('inputError');
                            registerInputList.userPasswordInput.addClass('inputError');
                            // Clear content of both input
                            registerInputList.userPasswordInput.val('');
                            registerInputList.userPasswordConfirmInput.val('');
                            // Set the focus on the password field
                            registerInputList.userPasswordInput.focus();
                            scope.$apply();
                        }
                        // If passwords are ok
                        else {
                            // Build of the json object that will be send to the server
                            var arrayOfUserData = {
                                userLogin: scope.user.userLogin,
                                userPassword: scope.user.userPassword,
                                userMail: scope.user.userMail,
                                userFirstName: scope.user.userFirstName,
                                userLastName: scope.user.userLastName
                            };

                            // Start server submit
                            AuthCtrl.submitRegisterForm(arrayOfUserData);
                        }

                    }

                });

            }
        };
    }

    // Handle error of input elements
    function handleInputError(error, input, focus) {
        // If the scope input element contains an error
        if (error) {
            // Add class that show error on the field
            input.addClass('inputError');
            // If the focus is not yet set
            if (!focus) {
                // Set the focus on this field
                focus = true;
                input.focus();
            }
        }
        return focus;
    }
})();