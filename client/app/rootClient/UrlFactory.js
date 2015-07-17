(function(){
	'use strict';

	/**
	 * @desc: Factory that offers method relative to the url
	 */

	angular.module('agilog').factory('UrlFactory', getUrlFactory);

	var inject = ['$location'];

	getUrlFactory.$inject = inject;

	function getUrlFactory($location){
		
		// Visible methods
		var service = {
			redirect: redirect
		};

		return service;

		// Change the url, does'nt call the server
		function redirect(link){
			$location.url(link);
		}
	}

})();