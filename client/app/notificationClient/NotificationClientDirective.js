/**
 * @Type        : Directive
 * @Name        : notificationClientDir
 * @Usage       : <notification-client-dir></notification-client-dir>
 * @Description : Cette directive permet de définir le template à utiliser
 *                ainsi que le controller
 */
agilogClient.directive('notificationClientDir', [
function(){
    
    return{
        restrict: 'E',  // On applique la directive sur la balise portant son nom
        templateUrl: 'partials/notification.html', // Lien vers le template à appliquer
        controller: 'NotificationClientController' // Controller associé
    }
    
}]);

/**
 * @Type        : Directive
 * @Name        : currentNotifDir
 * @Usage       : <balise current-notif-dir></balise>
 * @Description : Cette directive gère côté JS les événements liés à
 *                une notification
 */
agilogClient.directive('currentNotifDir', [
function(){
    
    return function(scope, notification) {

        // Quand on clic sur une notification
    	$(notification).on("click", function(){
            // On la cache
    		$(this).hide();
    	});
    }
    
}]);