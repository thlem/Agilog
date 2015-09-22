(function() {
    'use strict';

    /**
     * @name authenticationLoginFormDir
     * @description The directive relative to the login form
     * @memberof ag.acc.auth
     */

    angular.module('ag.acc.manage').directive('accountManageLoginInfoDir', getAccountManageLoginInfoDir);

    var inject = ['NotificationFactory', 'ErrorMessageConstant', '$location', '$rootScope', 'StorageFactory'];

    getAccountManageLoginInfoDir.$inject = inject;

    function getAccountManageLoginInfoDir(NotificationFactory, ErrorMessageConstant,
        $location, $rootScope, StorageFactory) {
        return {
            restrict: 'A',
            controller: 'AccountManageLoginInfoController as AccCtrl',
            scope: {},
            link: function(scope, element, attrs, AccCtrl) {

                element.on('submit', function() {

                    var doUpdate = false;

                    var arrayOfUserData = {},
                        login = angular.element(document.querySelector('#userLogin')),
                        password = angular.element(document.querySelector('#userPassword')),
                        passwordConfirm = angular.element(document.querySelector('#userPasswordConfirm'));

                    if (login && login.val() !== '') {
                        var userInLocalStorage = StorageFactory.getUserFromLocalStorage();

                        if (login.val() !== userInLocalStorage.usrLogin) {
                            arrayOfUserData.userLogin = login.val();
                            doUpdate = true;
                        }

                    }
                    if (password && password.val() !== '') {
                        if (passwordConfirm && passwordConfirm.val() !== '') {
                            if (password.val() === passwordConfirm.val()) {
                                arrayOfUserData.userPassword = password.val();
                                doUpdate = true;
                            } else {
                                scope.$apply(function() {
                                    NotificationFactory.addToErrorMessages(
                                        'Both password have to be identical');
                                });
                            }
                        } else {
                            scope.$apply(function() {
                                NotificationFactory.addToErrorMessages(
                                    'Both password have to be set');
                            });
                        }
                    }

                    if (Object.keys(arrayOfUserData).length !== 0 && doUpdate) {
                        AccCtrl.submitAccountManageLoginInfo(arrayOfUserData);
                    }
                });

            }
        };
    }
})();