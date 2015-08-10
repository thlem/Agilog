(function(){
    'use strict';

	/**
	 * @name AuthenticationLoginController
	 * @description The controller of the login form
     * @memberof ag.acc.auth
	 */

    angular.module('ag.acc.auth').controller('AuthenticationLoginController', getAuthenticationLoginController);

    var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
    'NotificationFactory', 'ProxyFactory', 'ApiConstant', 'StorageFactory'];

    getAuthenticationLoginController.$inject = inject;

    function getAuthenticationLoginController($scope, $location, $rootScope,
        AuthenticationFactory, NotificationFactory, ProxyFactory, ApiConstant, StorageFactory){

        /*jshint validthis: true */
        var vm = this;

        // Call the Factory that call the server
        // Submit the login data
        vm.submitLoginForm = function(arrayOfUserData){
            AuthenticationFactory.submitLoginForm(arrayOfUserData)
            .then(function(responseData){
                // If the server returns the user correctly
                if(responseData.user){
                    // Add it to the localStorage
                    StorageFactory.addOrUpdateUserInLocalStorage(responseData.user);
                    NotificationFactory.addToSuccessMessages(responseData.message);
                    $rootScope.endLoading();
                    ProxyFactory.redirect(ApiConstant.CLIENT_HOME);
                }
                else{
                    NotificationFactory.addToErrorMessages('Something goes wrong');
                    $rootScope.endLoading();
                }
            })
            .catch(function(responseData){
                NotificationFactory.addToErrorMessages(responseData.message);
                $rootScope.endLoading();
            });
        };

        // Used as ng-model
        $scope.user = {};

    }
})();