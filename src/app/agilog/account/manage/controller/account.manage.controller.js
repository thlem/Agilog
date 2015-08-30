(function(){
    'use strict';

	/**
	 * @name AuthenticationLoginController
	 * @description The controller of the login form
     * @memberof ag.acc.auth
	 */

    angular.module('ag.acc.manage').controller('AccountManageController', getAccountManageController);

    var inject = ['$scope', '$location', '$rootScope', 'AccountManageFactory',
    'NotificationFactory', 'ProxyFactory', 'CliUrlConstant', 'StorageFactory'];

    getAccountManageController.$inject = inject;

    function getAccountManageController($scope, $location, $rootScope,
        AccountManageFactory, NotificationFactory, ProxyFactory, CliUrlConstant, StorageFactory){

        /*jshint validthis: true */
        var vm = this;  

        vm.deleteAccount = function(){
            AccountManageFactory.deleteAccount()
            .then(function(response){
                NotificationFactory.addToSuccessMessages(response.message);
                StorageFactory.removeUserFromLocalStorage();
                ProxyFactory.redirect(CliUrlConstant.CLIENT_HOME);
            })
            .catch(function(response){
                NotificationFactory.addToSuccessMessages('Error when deleting your account');
                console.log(response);
            });
        };

        // Get the user from the localstorage
        $scope.user = StorageFactory.getUserFromLocalStorage();

    }
})();