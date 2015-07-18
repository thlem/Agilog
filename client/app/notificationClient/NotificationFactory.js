(function(){
	'use strict';
	
    /**
	 * @desc Factory that offers notification list manipulation
     */
    
    angular.module('agilog').factory('NotificationFactory', getNotificationFactory);
    
    var inject = ['$timeout'];
    
    getNotificationFactory.$inject = inject;
    
    function getNotificationFactory($timeout){
    
        // Error message list
        var errorMessages = [];
        // SuccessMessageList
        var successMessages = [];
    
        // Visible methods
		var service = {
            getErrorMessages: getErrorMessages,
            getSuccessMessages: getSuccessMessages,
            addToErrorMessages: addToErrorMessages,
            addToSuccessMessages: addToSuccessMessages,
            removeAllErrorMessages: removeAllErrorMessages,
            removeAllSuccessMessages: removeAllSuccessMessages
		};
		return service;
        
        // Return the error message list
        function getErrorMessages(){
            return errorMessages;
        }
        
        // Return the success message list
        function getSuccessMessages(){
            return successMessages;
        }
        
        // Add the error passed in parameter to the 
        // error message list.
        // Add a timer to automatically remove the error
        // at the end of the timer
        function addToErrorMessages(error){
            // If the error is not empty
            if(error && !angular.equals(error, '')){
                // Check if the error message is already in the list
                for(var i = 0; i<errorMessages.length; i++){
                    if(errorMessages[i][0] === error){
                        // If the error message has been found
                        // Cancel its timer
                        $timeout.cancel(errorMessages[i][1]);
                        // Delete the error from the list
                        errorMessages.splice(i,1);
                    }
                }
                
                // An array containing the error message and
                // its timer
                var currentError = [];
                // Add the error message
                currentError.push(error);
                // Create a timer that remove the error
                // after 9scd
                var timeout = $timeout(function(){
                    for(var i = 0; i<errorMessages.length; i++){
                        if(errorMessages[i][0] === error){
                            errorMessages.splice(i,1);
                        }
                    }
                },9000);
                
                // Add the timer to the array
                currentError.push(timeout);
                // Add the error+timer to the list
                errorMessages.push(currentError);
            }
        }
        
        // Add the success passed in parameter to the 
        // success message list.
        // Add a timer to automatically remove the success
        // at the end of the timer
        function addToSuccessMessages(success){
            // If the success is not empty
            if(success && !angular.equals(success, '')){
                // Check if the success message is already in the list
                for(var i = 0; i<successMessages.length; i++){
                    if(successMessages[i][0] === success){
                        // If the success message has been found
                        // Cancel its timer
                        $timeout.cancel(successMessages[i][1]);
                        // Delete the success from the list
                        successMessages.splice(i,1);
                    }
                }

                // An array containing the success message and
                // its timer
                var currentSuccess = [];
                // Add the success message
                currentSuccess.push(success);
                // Create a timer that remove the success
                // after 9scd
                var timeout = $timeout(function(){
                    for(var i = 0; i<successMessages.length; i++){
                        if(successMessages[i][0] === success){
                            successMessages.splice(i,1);
                        }
                    }
                },9000);
                
                // Add the timer to the array
                currentSuccess.push(timeout);
                // Add the success+timer to the list
                successMessages.push(currentSuccess);
            }
        }
        
        // Clear the error list and remove timer
        function removeAllErrorMessages(){
            for(var i = 0; i<errorMessages.length; i++){
                $timeout.cancel(errorMessages[i][1]);
            }
            errorMessages = [];
        }
        
        // Clear the success list and remove timer
        function removeAllSuccessMessages(){
            for(var i = 0; i<successMessages.length; i++){
                $timeout.cancel(successMessages[i][1]);
            }
            successMessages = [];
        }
    
    }
    
})();