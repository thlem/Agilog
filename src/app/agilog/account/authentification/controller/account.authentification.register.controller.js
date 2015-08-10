(function(){
    'use strict';

	/**
	 * @name AuthenticationRegisterController
	 * @description The constroller of the register form
     * @memberof ag.acc.auth
	 */

    angular.module('ag.acc.auth').controller('AuthenticationRegisterController', getAuthenticationRegisterController);

    var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
        'NotificationFactory', 'ProxyFactory', 'ApiConstant', 'StorageFactory'];

    getAuthenticationRegisterController.$inject = inject;

    function getAuthenticationRegisterController($scope, $location, $rootScope,
        AuthenticationFactory, NotificationFactory, ProxyFactory, ApiConstant, StorageFactory){

        /*jshint validthis: true */
        var vm = this;

        // Call the Factory that call the server
        // Submit the register data
        vm.submitRegisterForm = function(arrayOfUserData, errorCallback){
            AuthenticationFactory.submitRegisterForm(arrayOfUserData)
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
                    errorCallback();
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