// Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
// An IIFE removes variables from the global scope
(function(){
	'use strict';

	angular.module("NavigationModule").controller("NavigationController", NavigationController);

    NavigationController.$inject = ["NavigationService", "$scope"];
    
	function NavigationController(NavigationService, $scope){

		$scope.menuElements = NavigationService.menuElements.elements;
		console.log($scope.menuElements);
	}
})();