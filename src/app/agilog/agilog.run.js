(function(){
    'use strict';

	/**
	 * @name run
	 * @description Run Kickstart the application
     * @memberof ag
	 */

    angular.module('ag').run(getRun);

    var inject = ['$rootScope', '$localStorage'];

    getRun.$inject = inject;

    function getRun($rootScope, $localStorage){
        $rootScope.root = {};
        $rootScope.root.loading = null;
        $rootScope.root.loadingQueue = 0;
        $rootScope.root.pageTitle = 'Home';

        // If the localStorage contains a user
        if($localStorage.user){
            // Update the global scope
            $rootScope.root.user = $localStorage.user;
        }
    }
})();