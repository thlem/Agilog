(function() {
    'use strict';

    /**
     * @name authenticationLoginFormDir
     * @description The directive relative to the login form
     * @memberof ag.acc.auth
     */

    angular.module('ag.acc.manage').directive('accountManagePersonalInfoDir', getAccountManagePersonalInfoDir);

    var inject = ['NotificationFactory', 'ErrorMessageConstant', '$location', '$rootScope', 'StorageFactory'];

    getAccountManagePersonalInfoDir.$inject = inject;

    function getAccountManagePersonalInfoDir(NotificationFactory, ErrorMessageConstant,
        $location, $rootScope, StorageFactory) {
        return {
            restrict: 'A',
            controller: 'AccountManagePersonalInfoController as AccCtrl',
            scope: {},
            link: function(scope, element, attrs, AccCtrl) {

                element.on('submit', function() {

                    var arrayOfUserData = {},
                        firstName = angular.element(document.querySelector('#usrFirstName')),
                        lastName = angular.element(document.querySelector('#usrLastName')),
                        mail = angular.element(document.querySelector('#usrMail'));

                    arrayOfUserData.usrFirstName = firstName.val();
                    arrayOfUserData.usrLastName = lastName.val();
                    arrayOfUserData.usrMail = mail.val();

                    AccCtrl.submitAccountManagePersonalInfo(arrayOfUserData);
                });

            }
        };
    }
})();