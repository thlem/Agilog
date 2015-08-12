(function(){
    'use strict';

	/**
	 * @name AuthenticationLoginController
	 * @description The controller of the login form
     * @memberof ag.acc.auth
	 */

    angular.module('ag.acc.manage').controller('AccountManageLoginInfoController', getAccountManageLoginInfoController);

    var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
    'NotificationFactory', 'ProxyFactory', 'CliUrlConstant', 'StorageFactory'];

    getAccountManageLoginInfoController.$inject = inject;

    function getAccountManageLoginInfoController($scope, $location, $rootScope,
        AuthenticationFactory, NotificationFactory, ProxyFactory, CliUrlConstant, StorageFactory){

        /*jshint validthis: true */
        var vm = this;
        
        vm.submitAccountManageLoginInfo = function(arrayOfUserData){
            var user = {
                usrLogin:arrayOfUserData.usrLogin,
            };
            StorageFactory.addOrUpdateUserInLocalStorage(user);
            $rootScope.endLoading();
           /* AccountManageFactory.submitAccountManageLoginInfo(arrayOfUserData)
            .then(function(responseData){
                // If the server returns the user correctly
                if(responseData.user){
                    // Add it to the localStorage
                    StorageFactory.addOrUpdateUserInLocalStorage(responseData.user);
                    NotificationFactory.addToSuccessMessages(responseData.message);
                    $rootScope.endLoading();
                    ProxyFactory.redirect(CliUrlConstant.CLIENT_HOME);
                }
                else{
                    NotificationFactory.addToErrorMessages('Something goes wrong');
                    $rootScope.endLoading();
                }
            })
            .catch(function(responseData){
                NotificationFactory.addToErrorMessages(responseData.message);
                $rootScope.endLoading();
            });*/
        };
    }
})();