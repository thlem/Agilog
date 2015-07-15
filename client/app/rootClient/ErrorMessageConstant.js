(function(){
	'use strict';

	angular.module('agilogClient').constant('ErrorMessageConstant', getErrorMessageConstant);

	function getErrorMessageConstant(){
		return {
			REGISTER_PASSWORDS_WRONG: 'Password and confirmation are not identical'
		}
	}

})();