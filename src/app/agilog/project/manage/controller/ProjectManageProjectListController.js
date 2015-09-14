(function() {
    'use strict';

    angular.module('ag.prj.manage').controller('ProjectManageProjectListController', getProjectManageProjectListController);

    var inject = [];

    getProjectManageProjectListController.$inject = inject;

    function getProjectManageProjectListController(){

    	var vm = this;

    	$scope.projectList = {};

    };

})();