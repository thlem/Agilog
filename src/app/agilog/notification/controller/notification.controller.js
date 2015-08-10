(function(){
    'use strict';

	/**
	 * @name NotificationController
	 * @description The controller that display notification list
     * @memberof ag.notif
	 */

    angular.module('ag.notif').controller('NotificationController', getNotificationController);

    var inject = ['NotificationFactory', '$scope'];

    getNotificationController.$inject = inject;

    function getNotificationController(NotificationFactory, $scope){

    	$scope.notification                 = {}; // Json object that contains all visible notification
        $scope.notification.errorMessages   = []; // Array that contains all visible error notification
        $scope.notification.successMessages = []; // Array thant contains all visible success notification
        
        // Add a listener to the error list that update the scope list 
        // when the list changes
        $scope.$watch(function(){
            return NotificationFactory.getErrorMessages();
        },
        function(){
            $scope.notification.errorMessages = NotificationFactory.getErrorMessages();
        }, true);
        
        // Add a listener to the error list that update the scope list 
        // when the list changes
        $scope.$watch(function(){
            return NotificationFactory.getSuccessMessages();
        },
        function(){
            $scope.notification.successMessages = NotificationFactory.getSuccessMessages();
        }, true);

    }
})();