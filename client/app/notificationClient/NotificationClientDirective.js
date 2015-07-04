/**
 * Directive relative aux notifications
 * @Directive : notificationDirective 
 */
agilogClient.directive('notificationClientDir', [
function(){
    
    return{
        restrict: 'E',  // On applique la directive sur la balise portant son nom
        templateUrl: 'partials/notification.html', // Lien vers le template à appliquer
        controller: 'NotificationClientController' // Controller associé
    }
    
}]);
agilogClient.directive('currentNotifDir', [
function(){
    
    return function(scope, notification) {
    	$(notification).on("click", function(){
    		$(this).hide();
    	});
    }
    
}]);