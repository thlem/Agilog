(function(){
    'use strict';

	/**
	 * @name AuthenticationLogoutController
	 * @description The controller of the logout action
     * @memberof ag.acc.auth
	 */

    angular.module('ag.acc.auth').controller('AuthenticationLogoutController', getAuthenticationLogoutController);

    var inject = ['$scope', '$location', '$rootScope', 'AuthenticationFactory',
        'NotificationFactory', 'ProxyFactory', 'CliUrlConstant', 'StorageFactory'];

    getAuthenticationLogoutController.$inject = inject;

    function getAuthenticationLogoutController($scope, $location, $rootScope,
        AuthenticationFactory, NotificationFactory, ProxyFactory, CliUrlConstant, StorageFactory){

        $rootScope.startLoading();
        // Call of the factory
        AuthenticationFactory.logout()
        .then(function(responseData){
            // Always logout the user, even if the server return a bad response
            NotificationFactory.addToSuccessMessages(responseData.message);
            StorageFactory.removeUserFromLocalStorage();
            $rootScope.endLoading();
            // Redirect to the Home
            ProxyFactory.redirect(CliUrlConstant.CLIENT_HOME);
        });

    }
})();