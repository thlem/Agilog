(function() {
    'use strict';

    /**
     * @name NavigationMainDirective
     * @description The navigation main directive that load the template
     * @memberof ag.nav
     */

    angular.module('ag.prj.manage').directive('projectManageListUserProjectDir', getProjectManageListUserProjectDir);

    var inject = [];

    getProjectManageListUserProjectDir.$inject = inject;

    function getProjectManageListUserProjectDir() {
        return {
            restrict: 'A',
            templateUrl: './partials/project/project-list-user-projects.html',
            link: function(scope, element) {

            }
        };
    }
})();