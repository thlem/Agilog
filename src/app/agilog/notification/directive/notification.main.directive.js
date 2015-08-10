(function(){
    'use strict';

	/**
	 * @name notificationDir
	 * @description The notification main directive that load the template
     * @memberof ag.notif
	 */

    angular.module('ag.notif').directive('notificationDir', getNotificationDir);

    var inject = [];

    getNotificationDir.$inject = inject;

    function getNotificationDir(){
       return{
			restrict: 'E',  // Element only
            templateUrl: 'partials/notification.html',
            controller: 'NotificationController' // Controller
		};
    }
})();