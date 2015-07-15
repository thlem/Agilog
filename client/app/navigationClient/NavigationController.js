(function(){
	'use strict';

	angular.module("agilogClient").controller("NavigationController", NavigationController);

    NavigationController.$inject = ["NavigationService", "$scope"];
    
	function NavigationController(NavigationService, $scope){

		$scope.menuElements = NavigationService.menuElements.elements;
	}
})();