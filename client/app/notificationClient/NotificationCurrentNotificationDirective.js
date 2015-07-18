(function(){
	'use strict';

	/**
	 * @desc The directive of each notification to catch click event
	 * @example <notification-current-notification-dir></notification-current-notification-dir>
	 */

	angular.module('agilog').directive('notificationCurrentNotificationDir',
		getNotificationCurrentNotificationDir);
    
	function getNotificationCurrentNotificationDir(){
		return{
			restrict: 'A',  // Attribute only
            link: function(scope, element, attrs){
                
                // On notification click
                element.on('click', function(){
                    // Hiding the current notification
                    $(this).hide();
                });

                element.on('mouseenter', function(){
                	element.addClass('test');
                });
                element.on('mouseleave', function(){
                	element.removeClass('test');
                });
            }
		};
	}
    
})();