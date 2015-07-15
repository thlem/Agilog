(function(){
	'use strict';

	angular.module('agilogClient').factory('UrlFactory', getUrlFactory);

	var inject = ['$location'];

	getUrlFactory.$inject = inject;

	function getUrlFactory($location){
		var service = {
			redirect: redirect
		}

		return service;

		function redirect(link){
			$location.url(link);
		}
	}

})();