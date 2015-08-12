(function(){
	'use strict';

	/**
     * @name ErrorMessageConstant
     * @description Constant file for error message
     * @memberof ag.tech
     */

	angular.module('ag.tech').constant('ErrorMessageConstant', {
        PASSWORD_CONFIRM_NOT_IDENTICAL : 'Password and confirmation are not identical',
        GUEST_ONLY_ERROR               : 'You tried to access on a guest only resource',
        REGISTER_ONLY_ERROR            : 'You tried to access on a register only resource'
	});

})();