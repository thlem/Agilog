(function() {
    'use strict';

    /**
     * @name AuthenticationLoginController
     * @description The controller of the login form
     * @memberof ag.acc.auth
     */

    angular.module('ag.acc.auth').controller('AuthenticationLoginController', getAuthenticationLoginController);

    var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
        'NotificationFactory', 'ProxyFactory', 'CliUrlConstant', 'StorageFactory'
    ];

    getAuthenticationLoginController.$inject = inject;

    function getAuthenticationLoginController($scope, $location, $rootScope,
        AuthenticationFactory, NotificationFactory, ProxyFactory, CliUrlConstant, StorageFactory) {

        /*jshint validthis: true */
        var vm = this;

        // Call the Factory that call the server
        // Submit the login data
        vm.submitLoginForm = function(arrayOfUserData) {
            AuthenticationFactory.submitLoginForm(arrayOfUserData)
                .then(function(responseData) {
                    // If the server returns the user correctly
                    if (responseData.user) {
                        // Add it to the localStorage
                        StorageFactory.addOrUpdateUserInLocalStorage(responseData.user);
                        NotificationFactory.addToSuccessMessages(responseData.message);
                        ProxyFactory.redirect(CliUrlConstant.CLIENT_HOME);
                    } else {
                        NotificationFactory.addToErrorMessages('Something goes wrong');
                    }
                })
                .catch(function(responseData) {
                    NotificationFactory.addToErrorMessages(responseData.message);
                });
        };

        // Used as ng-model
        $scope.user = {};

    }
})();