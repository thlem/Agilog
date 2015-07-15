(function(){
	'use strict';

	angular.module('agilogClient').constant('UrlConstant', getUrlConstant);

	function getUrlConstant(){
		return {
			HOME: '/'
		}
	}

})();