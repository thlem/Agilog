(function(){
    'use strict';

	/**
	 * @name authenticationLoginFormDir
	 * @description The directive relative to the login form
     * @memberof ag.acc.auth
	 */

    angular.module('ag.acc.auth').directive('authenticationLoginFormDir', getAuthenticationLoginFormDir);

    var inject = ['NotificationFactory', 'ErrorMessageConstant', '$location', '$rootScope'];

    getAuthenticationLoginFormDir.$inject = inject;

    function getAuthenticationLoginFormDir(NotificationFactory, ErrorMessageConstant,
        $location, $rootScope){
        return{
            restrict:'A',
            controller:'AuthenticationLoginController as AuthCtrl',
            link:function(scope, element, attrs, AuthCtrl){

                var loginForm       = $(element[0]),
                    loginInputList  = {
                        usrLoginInput           : $(loginForm.find('#usrLogin')),
                        usrPasswordInput        : $(loginForm.find('#usrPassword'))
                    };

                // On the page displayed if the usrLogin input contains
                // a value then we set the focus on the usrPassword input
                if(!angular.equals(loginInputList.usrLoginInput.val(), '')){
                    loginInputList.usrPasswordInput.focus();
                }
                else{
                    loginInputList.usrLoginInput.focus();
                }

                // On login form submit
                loginForm.on('submit', function(){
                    // start the loading spinner
                    $rootScope.startLoading();
                    // Clear error class
                    $('.inputError').removeClass('inputError');

                    // Check form validity
                    if(!scope.loginForm.$valid){
                        
                            // Initialize the focus
                        var focusAlreadySet                 = false,
                            // Get different errors of the form
                            loginRequiredError              = scope.loginForm.usrLogin.$error.required,
                            passwordRequiredError           = scope.loginForm.usrPassword.$error.required;

                        // Check if the login is missing
                        focusAlreadySet = handleInputError(loginRequiredError,
                            loginInputList.usrLoginInput, focusAlreadySet);
                        // Check if the password is missing
                        focusAlreadySet = handleInputError(
                            passwordRequiredError, loginInputList.usrPasswordInput, focusAlreadySet);

                        // End of check stop loading
                        $rootScope.endLoading();
                    }
                    else{
                        // Build of the json object that will be send to the server
                        var arrayOfUserData = {
                            usrLogin:scope.user.usrLogin,
                            usrPassword:scope.user.usrPassword
                        };

                        // Start server submit
                        AuthCtrl.submitLoginForm(arrayOfUserData);
                    }

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