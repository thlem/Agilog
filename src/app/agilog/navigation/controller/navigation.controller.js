(function() {
    'use strict';

    /**
     * @name NavigationController
     * @description The navigation controller that load menu elements
     * @memberof ag.nav
     */

    angular.module('ag.nav').controller('NavigationController', getNavigationController);

    var inject = ['$scope', 'NavigationFactory'];

    getNavigationController.$inject = inject;

    function getNavigationController($scope, NavigationFactory) {

        // Put in the scope menu elements get from the service
        $scope.menuElements = NavigationFactory.getMenuElements();
    }
})();