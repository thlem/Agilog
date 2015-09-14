(function() {
    'use strict';

    /**
     * @name AuthenticationLoginController
     * @description The controller of the login form
     * @memberof ag.acc.auth
     */

    angular.module('ag.acc.manage').controller('AccountManagePersonalInfoController', getAccountManagePersonalInfoController);

    var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
        'NotificationFactory', 'ProxyFactory', 'CliUrlConstant', 'StorageFactory',
        'AccountManageFactory'
    ];

    getAccountManagePersonalInfoController.$inject = inject;

    function getAccountManagePersonalInfoController($scope, $location, $rootScope,
        AuthenticationFactory, NotificationFactory, ProxyFactory, CliUrlConstant,
        StorageFactory, AccountManageFactory) {

        /*jshint validthis: true */
        var vm = this;

        vm.submitAccountManagePersonalInfo = function(arrayOfUserData) {
            AccountManageFactory.submitAccountManagePersonalInfo(arrayOfUserData)
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