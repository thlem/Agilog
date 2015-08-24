(function(){
    'use strict';

	/**
	 * @name AuthenticationLoginController
	 * @description The controller of the login form
     * @memberof ag.acc.auth
	 */

    angular.module('ag.acc.manage').controller('AccountManageController', getAuthenticationLoginController);

    var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
    'NotificationFactory', 'ProxyFactory', 'CliUrlConstant', 'StorageFactory'];

    getAuthenticationLoginController.$inject = inject;

    function getAuthenticationLoginController($scope, $location, $rootScope,
        AuthenticationFactory, NotificationFactory, ProxyFactory, CliUrlConstant, StorageFactory){

        /*jshint validthis: true */
        var vm = this;
        
        //$rootScope.root.pageTitle = 'Manage your account';
        
        // Get the user from the localstorage
        var user = StorageFactory.getUserFromLocalStorage();
        // Init of the user used in the page
        $scope.user = {};
        
        // Watch the user in the localstorage 
        // to change scope when localstorage changes
        $scope.$watch(function() {
          return user;
        }, function() {
            // copy it to don't change localstorage
            // user when changing scope user
            angular.copy(user, $scope.user);
        }, true);
               
    }
})();