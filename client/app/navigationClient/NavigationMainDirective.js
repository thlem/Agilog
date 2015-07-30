(function(){
	'use strict';

	/**
	 * @desc The main directive of the module
	 * @example <div id="navigation-bottom-wrapper" navigation-dir></div>
	 */

	angular.module('agilog').directive('navigationDir', getNavigationDir);

    getNavigationDir.$inject = ['NavigationService', '$compile'];
    
	function getNavigationDir(NavigationService, $compile){
		return{
			restrict:'E', // On attribute only
			templateUrl:'partials/navigation.html',
			compile:function(scope, element){

				// Get the device width
				var mediaWidth = window.matchMedia('(max-width: 768px)');
				// If we are less than 768px
				if(!mediaWidth.matches){
					NavigationService.config.isMobile = false;
                    NavigationService.config.bottomClosePosition = 0;
				}
                
                var t;
                angular.element(window).bind('resize', function() {
                    clearTimeout(t);
                    t = setTimeout(function() {
                        var mediaWidth = window.matchMedia('(max-width: 768px)');
                        if(!mediaWidth.matches){
                            NavigationService.config.isMobile = false;
                            NavigationService.config.bottomClosePosition = 0;
                        }
                        else{
                            NavigationService.config.isMobile = true;
                            NavigationService.config.bottomClosePosition = -61;
                        }
                        $('div#navigation-bottom-wrapper').clearQueue().stop().animate({
                                bottom : NavigationService.config.bottomClosePosition+'px',	// reset the position
                                height:NavigationService.config.menuHeight+'px'				// reset the height
                            },100);
                            subMenuOpen = false;
                        $scope.$apply();
                    }, 300);
                });
			}
		};
	}
})();