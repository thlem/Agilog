(function(){
	'use strict';

	/**
	 * @desc The main directive of the module
	 * @example <notification-dir></notification-dir>
	 */

	angular.module('agilog').directive('notificationDir', getNotificationDir);
    
	function getNotificationDir(){
		return{
			restrict: 'E',  // Element only
            templateUrl: 'partials/notification.html',
            controller: 'NotificationController' // Controller
		};
	}
    
})();