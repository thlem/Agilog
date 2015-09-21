(function() {
    'use strict';

    angular.module('ag.prj.manage').controller('ProjectManageProjectListController', getProjectManageProjectListController);

    var inject = ['$scope', 'ProxyFactory'];

    getProjectManageProjectListController.$inject = inject;

    function getProjectManageProjectListController($scope, ProxyFactory){

    	var vm = this;
		ProxyFactory.sendGetRequest('/project/getlist/thomas', null)
		.then(function(response){
			
		});
    	$scope.projectList = {};

    };

})();