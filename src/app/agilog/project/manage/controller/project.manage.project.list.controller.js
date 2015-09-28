(function() {
    'use strict';

    angular.module('ag.prj.manage').controller('ProjectManageProjectListController', getProjectManageProjectListController);

    var inject = ['$scope', 'ProxyFactory'];

    getProjectManageProjectListController.$inject = inject;

    function getProjectManageProjectListController($scope, ProxyFactory){

    	var vm = this;
        $scope.projects = {}
        $scope.projects.userProjectList = {};
		ProxyFactory.sendGetRequest('/project/getlist/thomas', null)
		.then(function(responseData){
			$scope.projects.userProjectList = responseData.projects;
		});
    	$scope.projectList = {};

    };

})();