(function(){
	'use strict';

	/**
	 * @desc The main directive of the module
	 * @example <div id="navigation-bottom-wrapper" navigation-dir></div>
	 */

	angular.module('agilog').directive('navigationDir', getNavigationDir);

    getNavigationDir.$inject = ['NavigationService', '$compile'];
    
	function getNavigationDir(NavigationService, $compile){
		return{
			restrict:'E', // On attribute only
			templateUrl:'partials/navigation.html',
			compile:function(scope, element){

			}
		};
	}
})();