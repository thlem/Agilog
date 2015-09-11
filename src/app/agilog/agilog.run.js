(function(){
    'use strict';

	/**
	 * @name run
	 * @description Run Kickstart the application
     * @memberof ag
	 */

    angular.module('ag').run(getRun);

    var inject = ['$rootScope', '$localStorage', 'NotificationFactory',
    'ProxyFactory', 'StorageFactory', 'ErrorMessageConstant', 'CliUrlConstant'];

    getRun.$inject = inject;

    function getRun($rootScope, $localStorage, NotificationFactory,
    ProxyFactory, StorageFactory, ErrorMessageConstant, CliUrlConstant){
        $rootScope.root = {};
        $rootScope.root.loading = null;
        $rootScope.root.loadingQueue = 0;
        $rootScope.root.pageTitle = '';

        // If the localStorage contains a user
        if($localStorage.user){
            // Update the global scope
            $rootScope.root.user = $localStorage.user;
        }
        
        // When the route change
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            // If the next route is defined
            if(toState){
                $rootScope.root.pageTitle = toState.title;
                // Check if the user is online
                StorageFactory.isUserOnline()
                // If the user is logged
                .then(function(){
                    // If the route is guestOnly, we cannot access to this route
                    if(toState.guestOnly){
                        NotificationFactory.addToErrorMessages(ErrorMessageConstant.GUEST_ONLY_ERROR);
                        e.preventDefault();
                        ProxyFactory.redirect(CliUrlConstant.CLIENT_HOME);
                    }
                })
                // If the user is not logged
                .catch(function(){
                    // If the route is not public, we restrict the access
                    if(!toState.public){
                        NotificationFactory.addToErrorMessages(ErrorMessageConstant.REGISTER_ONLY_ERROR);
                        e.preventDefault();
                        ProxyFactory.redirect(CliUrlConstant.CLIENT_LOGIN);
                    }
                });
            }
        });
        
    }
})();