(function(){
	'use strict';

	/**
     * @desc The constant that contains all client error messages
     */

	angular.module('agilog').constant('ErrorMessageConstant', getErrorMessageConstant);

	function getErrorMessageConstant(){
		return {
			REGISTER_PASSWORDS_WRONG: 'Password and confirmation are not identical'
		};
	}

})();