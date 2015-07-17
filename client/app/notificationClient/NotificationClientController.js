(function(){
    'use strict';
    /**
     * @Type        : Controller
     * @Name        : NotificationClientController
     * @Description : Ce Controlleur stockant les liste de notifications affichées
     */
    angular.module("agilog").controller('NotificationClientController', NotificationClientController);

    NotificationClientController.$inject = ["NotificationClientService", "$scope"];

    function NotificationClientController(NotificationClientService, $scope) {
        
        // Définition des liste de notification du controller
        $scope.notification = {};
        $scope.notification.errorMessages = [];
        $scope.notification.successMessages = [];
        
        // Ajout d'un listener sur la liste des messages d'erreur du service
        $scope.$watch(function(){
            return NotificationClientService.getErrorMessages();
        },
        function(){
            // Dès que la liste change on met à jour la vue
            $scope.notification.errorMessages = NotificationClientService.getErrorMessages();
        }, true);
        
        // Ajout d'un listener sur la liste des messages success du service
        $scope.$watch(function(){
            return NotificationClientService.getSuccessMessages();
        },
        function(){
            // Dès que la liste change on met à jour la vue
            $scope.notification.successMessages = NotificationClientService.getSuccessMessages();
        }, true);
        
    };
})();