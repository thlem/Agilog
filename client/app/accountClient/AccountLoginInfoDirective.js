(function(){
	'use strict';

	angular.module('agilog').directive('usrAccountLoginInfoDir', getUsrAccountLoginInfoDir);

	var inject = ['NotificationFactory', 'AuthenticationFactory',
		'$location', '$rootScope', '$q', 'ErrorMessageConstant'];

	getUsrAccountLoginInfoDir.$inject = inject;

	function getUsrAccountLoginInfoDir(NotificationFactory, AuthenticationFactory,
		$location, $rootScope, $q, ErrorMessageConstant){

		return{
			restrict:'A',
			controller:'AccountController as AccountCtrl',
			link: function(scope, element, attrs, AccountCtrl){

				element.on('submit', function(){


					$rootScope.startLoading();

					var arrayOfUserData;

					if(!(scope.user.usrPassword === '' && scope.user.usrPasswordConfirm === '')){
						if(angular.equals(scope.user.usrPassword, scope.user.usrPasswordConfirm)){
							arrayOfUserData = {
								usrLogin:scope.user.usrLogin,
								usrPassword:scope.user.usrPassword
							};
						}
						else{
							$(this).find('#usrPassword').focus();
							scope.user.usrPassword = '';
							scope.user.usrPasswordConfirm = '';
							NotificationFactory.addToErrorMessages(ErrorMessageConstant.PASSWORD_CONFIRM_NOT_IDENTICAL);
							$rootScope.endLoading();
						}
					}
					else{
						arrayOfUserData = {
							usrLogin:scope.user.usrLogin
						};
					}

					scope.$apply();
				});
			}
		};
	}
})();