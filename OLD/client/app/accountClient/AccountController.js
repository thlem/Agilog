(function(){
	'use strict';

	angular.module('agilog').controller('AccountController', getAccountController);

	var inject = ['$scope', '$rootScope'];

	getAccountController.$inject = inject;

	function getAccountController($scope, $rootScope){
		$rootScope.root.pageTitle = 'Manage your account';
		$scope.user = $rootScope.root.user;
		$scope.user.usrPassword = '';
		$scope.user.usrPasswordConfirm = '';
	}

	/*["$scope", "$rootScope",
		function($scope, $rootScope){

			var vm = this;

			vm.submitLoginInfo = function(arrayOfLoginInfo){

			};

			$rootScope.root.pageTitle = "Manage your account";
			$scope.user = $rootScope.root.user;
		}
	]);*/
})();