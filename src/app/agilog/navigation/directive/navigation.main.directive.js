(function(){
    'use strict';

	/**
	 * @name NavigationMainDirective
	 * @description The description of directive
     * @memberof ag.nav
	 */

    angular.module('ag.nav').directive('navigationDir', getNavigationDir);

    var inject = [];

    getNavigationDir.$inject = inject;

    function getNavigationDir(){
		return{
			restrict:'E',
			templateUrl:'../../partials/navigation.html',
			compile:function(scope, element){
				
			}
    	};
    }
})();