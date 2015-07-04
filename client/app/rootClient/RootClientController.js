agilogClient.controller("RootClientController", ['$rootScope', function($rootScope){

	/**
     * Méthode permettant d'afficher la fenêtre de Loading
     */
    $rootScope.startLoading = function(){
        $rootScope.root.loading = true;
        $rootScope.root.loadingQueue++;
    };

    /**
     * Méthode permettant de cacher la fenêtre de Loading
     */
    $rootScope.endLoading = function(){
        $rootScope.root.loadingQueue--;
        // On prévient les mauvais appel à la fonction
        if($rootScope.root.loadingQueue < 0){
            $rootScope.root.loadingQueue = 0;
        }
        if($rootScope.root.loadingQueue == 0) {
            $rootScope.root.loading = false;
        }
    };

}]);