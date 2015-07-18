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
            template: '<div id=\'notification\''+
                        ' ng-show=\'notification.errorMessages.length || notification.successMessages.length\'>'+
                            '<ul data-title=\'Cliquez sur une notification pour la cacher\''+
                                ' id="notificationError\' ng-show="notification.errorMessages.length\'>'+
                                '<li notification-current-notification-dir class=\'error\''+
                                    ' ng-repeat=\'error in notification.errorMessages\'>'+
                                    '{{ error[0] }}'+
                                '</li>'+
                            '</ul>'+
                            '<ul data-title=\'Cliquez sur une notification pour la cacher\''+
                                ' id=\'notificationSuccess\' ng-show=\'notification.successMessages.length\'>'+
                                '<li notification-current-notification-dir class=\'success\''+
                                    ' ng-repeat=\'success in notification.successMessages\'>'+
                                    '{{ success[0] }}'+
                                '</li>'+
                            '</ul>'+
                        '</div>',
            controller: 'NotificationController' // Controller
		};
	}
    
})();