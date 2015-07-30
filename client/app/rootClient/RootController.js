(function(){
    'use strict';

    /**
     * @desc The controller visible in the entire app
     */

    angular.module('agilog').controller('RootController', getRootController);

    var inject = ['$rootScope', 'AuthenticationFactory', 'NotificationFactory',
        'ErrorMessageConstant', 'ProxyFactory', 'UrlConstant'];

    getRootController.$inject = inject;

    function getRootController($rootScope, AuthenticationFactory, NotificationFactory,
        ErrorMessageConstant, ProxyFactory, UrlConstant){

    	// Method visible in the entire app and
        // allows to start the loading spinner
        $rootScope.startLoading = function(){
            $rootScope.root.loading = true;
            $rootScope.root.loadingQueue++;
        };

        // Method visible in the entire app and
        // allows to stop the loading spinner
        $rootScope.endLoading = function(){
            $rootScope.root.loadingQueue--;
            // Prevent bad call of the function
            if($rootScope.root.loadingQueue < 0){
                $rootScope.root.loadingQueue = 0;
            }
            if($rootScope.root.loadingQueue === 0) {
                $rootScope.root.loading = false;
            }
        };

    }

})();