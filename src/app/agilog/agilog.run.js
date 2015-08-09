(function(){
    'use strict';

	/**
	 * @name run
	 * @description Run Kickstart the application
     * @namespace ag
	 */

    angular.module('ag').run(getRun);

    var inject = ['$rootScope'];

    getRun.$inject = inject;

    function getRun($rootScope){
        $rootScope.root = {};
    }
})();