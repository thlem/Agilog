(function(){
	'use strict';

	/**
     * @desc The constant that contains all client error messages
     */

	angular.module('agilog').constant('ErrorMessageConstant', getErrorMessageConstant);

	function getErrorMessageConstant(){
		return {
			REGISTER_PASSWORDS_WRONG	: 'Password and confirmation are not identical',
			GUEST_ONLY_ERROR			: 'You tried to access on a guest only resource',
			REGISTER_ONLY_ERROR			: 'You tried to access on a register only resource'
		};
	}

})();