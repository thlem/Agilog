// Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
// An IIFE removes variables from the global scope
(function(){
	'use strict';

    /**
	 * @desc Controller of notification module that watches both list and 
     * contains notification visible by the user
     */    
    
	angular.module('agilog').controller('NotificationController', getNotificationController);

    getNotificationController.$inject = ['NotificationFactory', '$scope'];

    function getNotificationController(NotificationFactory, $scope) {
        
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