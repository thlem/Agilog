(function(){
    'use strict';

	/**
	 * @name authenticationLoginFormDir
	 * @description The directive relative to the login form
     * @memberof ag.acc.auth
	 */

    angular.module('ag.acc.manage').directive('accountManageLoginInfoDir', getAccountManageLoginInfoDir);

    var inject = ['NotificationFactory', 'ErrorMessageConstant', '$location', '$rootScope'];

    getAccountManageLoginInfoDir.$inject = inject;

    function getAccountManageLoginInfoDir(NotificationFactory, ErrorMessageConstant,
        $location, $rootScope){
        return{
            restrict:'A',
            controller:'AccountManageLoginInfoController as AccCtrl',
            scope: {},
            link:function(scope, element, attrs, AccCtrl){
            
                element.on('submit', function(){
                    $rootScope.startLoading();
                    
                    var arrayOfUserData = {},
                        login = angular.element(document.querySelector('#usrLogin')),
                        password = angular.element(document.querySelector('#usrPassword')),
                        passwordConfirm = angular.element(document.querySelector('#usrPasswordConfirm'));
                    
                    if(login && login.val() !== ''){
                        arrayOfUserData.usrLogin = login.val();
                    }
                    if(password && password.val() !== ''){
                        if(passwordConfirm && passwordConfirm.val() !== ''){
                            if(password.val() === passwordConfirm.val()){
                                arrayOfUserData.usrPassword = password.val();
                            }
                            else{
                                NotificationFactory.addToErrorMessages(
                                'Both password have to be identical');
                            }
                        }
                        else{
                            
                        }
                    }
                    
                    if(Object.keys(arrayOfUserData).length !== 0){
                        AccCtrl.submitAccountManageLoginInfo(arrayOfUserData);
                    }
                });
            
            }
        };
    }
})();