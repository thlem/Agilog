(function(){
    'use strict';

	/**
	 * @name ag
	 * @description The main module taht register all submodule
     * @namespace ag
	 */

    angular.module('ag', [
    	'ngResource',
    	'ui.router',
    	'ngStorage',
    	'ag.tech',
        'ag.nav'
   	]);
})();