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
				// If we are more than 768px
				if(!mediaWidth.matches){
					NavigationService.setMobile(false);
                    NavigationService.setBottomClosePosition(0);
				}

                NavigationService.setDeviceWidth($(window).width());
                NavigationService.setDeviceHeight($(window).height());

                var t;
                angular.element(window).bind('resize', function() {
                    clearTimeout(t);
                    t = setTimeout(function() {
                        var mediaWidth = window.matchMedia('(max-width: 768px)');
                        if(!mediaWidth.matches){
                            NavigationService.setMobile(false);
                            NavigationService.setBottomClosePosition(0);
                        }
                        else{
                            NavigationService.setMobile(true);
                            NavigationService.setBottomClosePosition(-61);
                            NavigationService.setMenuOpen(false);
                            NavigationService.setSubMenuOpen(false);
                        }
                        NavigationService.setDeviceWidth($(window).width());
                        NavigationService.setDeviceHeight($(window).height());
                        $('div#navigation-bottom-wrapper').clearQueue().stop().animate({
                                bottom : NavigationService.getBottomClosePosition()+'px',	// reset the position
                                height:NavigationService.getMenuHeight()+'px'				// reset the height
                            },100);
                        scope.$apply();
                    }, 300);
                });
			}
		};
	}
})();