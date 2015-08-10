(function(){
    'use strict';

	/**
	 * @name notificationCurrentNotificationDir
	 * @description The notification directive that hide notification when clicked on
     * @memberof ag.notif
	 */

    angular.module('ag.notif').directive('notificationCurrentNotificationDir', getNotificationCurrentNotificationDir);

    var inject = [];

    getNotificationCurrentNotificationDir.$inject = inject;

    function getNotificationCurrentNotificationDir(){
        return{
			restrict: 'A',  // Attribute only
            link: function(scope, element, attrs){
                
                // On notification click
                element.on('click', function(){
                    // Hiding the current notification
                    $(this).hide();
                });
            }
		};
    }
})();