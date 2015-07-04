/**
 * Service offrant les méthodes de manipulation des liste de notifications
 * @Service : notificationServiceClient
 * @param : $timeout : Module externe permettant de manipuler le local-storage
 */
agilogClient.service('NotificationClientService', ['$timeout', function($timeout) {
    
    // Liste des messages d'erreur
    var errorMessages = [];
    
    // Liste des message success
    var successMessages = [];
    
    /**
     * Retourne la liste des message d'erreur
     */
    this.getErrorMessages = function(){
        return errorMessages;
    };
    
    /**
     * Retourne la liste des message success
     */
    this.getSuccessMessages = function(){
        return successMessages;
    };
    
    /**
     * Méthode permettant d'ajouter une nouvelle notification en erreur,
     * ajoute un timer relatif à ce message qui le fera disparaitre
     * au bout de 9scd
     * @param : error : Le message à ajouter
     */
    this.addToErrorMessages = function(error){
        if(error && !angular.equals(error, '')){

            for(var i = 0; i<errorMessages.length; i++){
                if(errorMessages[i][0] === error){
                    $timeout.cancel(errorMessages[i][1]);
                    errorMessages.splice(i,1);
                }
            }

            var currentError = [];
            currentError.push(error);
            var timeout = $timeout(function(){
                for(var i = 0; i<errorMessages.length; i++){
                    if(errorMessages[i][0] === error){
                        errorMessages.splice(i,1);
                    }
                }
            },9000);
            currentError.push(timeout);
            errorMessages.push(currentError);
        }
    };
    
    /**
     * Méthode permettant d'ajouter une nouvelle notification en succès,
     * ajoute un timer relatif à ce message qui le fera disparaitre
     * au bout de 9scd
     * @param : message : Le message à ajouter
     */
    this.addToSuccessMessages = function(message){
        if(message && !angular.equals(message, '')){

            for(var i = 0; i<successMessages.length; i++){
                if(successMessages[i][0] === message){
                    $timeout.cancel(successMessages[i][1]);
                    successMessages.splice(i,1);
                }
            }

            var currentSuccess = [];
            currentSuccess.push(message);
            var timeout = $timeout(function(){
                for(var i = 0; i<successMessages.length; i++){
                    if(successMessages[i][0] === message){
                        successMessages.splice(i,1);
                    }
                }
            },9000);
            currentSuccess.push(timeout);
            successMessages.push(currentSuccess);
        }
    };
    
    /**
     * Méthode permettant de vider la liste de message d'erreur
     * et annuler les timeout en cours sur ces messages
     */
    this.removeAllErrorMessages = function(){
        for(var i = 0; i<errorMessages.length; i++){
            $timeout.cancel(errorMessages[i][1]);
        }
        errorMessages = [];
    };
    
    /**
     * Méthode permettant de vider la liste de message en succès
     * et annuler les timeout en cours sur ces messages
     */
    this.removeAllSuccessMessages = function(){
        for(var i = 0; i<successMessages.length; i++){
            $timeout.cancel(successMessages[i][1]);
        }
        successMessages = [];
    };
    
}]);