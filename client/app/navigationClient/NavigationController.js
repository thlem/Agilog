(function(){
	'use strict';

	/**
     * @desc The controller of the navigation
     */

	angular.module('agilog').controller('NavigationController', getNavigationController);

    getNavigationController.$inject = ['NavigationService', '$scope'];
    
	function getNavigationController(NavigationService, $scope){

		// Put in the scope menu elements get from the service
		$scope.menuElements = NavigationService.getMenuElements();
        
	}
})();