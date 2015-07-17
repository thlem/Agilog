(function(){
	'use strict';

	/**
     * @desc The controller of the navigation
     */

	angular.module("agilog").controller("NavigationController", NavigationController);

    NavigationController.$inject = ["NavigationService", "$scope"];
    
	function NavigationController(NavigationService, $scope){

		// Put in the scope menu elements get from the service
		$scope.menuElements = NavigationService.menuElements.elements;
	}
})();