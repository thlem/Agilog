(function() {
    'use strict';

    /**
     * @name AuthenticationLoginController
     * @description The controller of the login form
     * @memberof ag.acc.auth
     */

    angular.module('ag.acc.manage').controller('AccountManageLoginInfoController', getAccountManageLoginInfoController);

    var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
        'NotificationFactory', 'ProxyFactory', 'CliUrlConstant', 'StorageFactory',
        'AccountManageFactory'
    ];

    getAccountManageLoginInfoController.$inject = inject;

    function getAccountManageLoginInfoController($scope, $location, $rootScope,
        AuthenticationFactory, NotificationFactory, ProxyFactory, CliUrlConstant,
        StorageFactory, AccountManageFactory) {

        /*jshint validthis: true */
        var vm = this;

        // Get the user from the localstorage
        $scope.user = StorageFactory.getUserFromLocalStorage();

        vm.submitAccountManageLoginInfo = function(arrayOfUserData) {
            AccountManageFactory.submitAccountManageLoginInfo(arrayOfUserData)
                .then(function(responseData) {
                    // If the server returns the user correctly
                    if (responseData.user) {
                        // Add it to the localStorage
                        StorageFactory.addOrUpdateUserInLocalStorage(responseData.user);
                        NotificationFactory.addToSuccessMessages(responseData.message);
                    } else {
                        NotificationFactory.addToErrorMessages('Something goes wrong');
                    }
                })
                .catch(function(responseData) {
                    NotificationFactory.addToErrorMessages(responseData.message);
                });
        };
    }
})();