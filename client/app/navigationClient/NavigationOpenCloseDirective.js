(function(){
	'use strict';

	/**
	 * @desc Directive for Menu open/close button
	 * @example <div id="navigation-open-close-button" class="close" navigation-open-close-dir></div>
	 */

	angular.module('agilog').directive('navigationOpenCloseDir', getNavigationOpenCloseDir);

    getNavigationOpenCloseDir.$inject = ['NavigationService', '$compile'];
    
	function getNavigationOpenCloseDir(NavigationService, $compile){
		return {
	 		restrict: 'A',
	 		link: function(scope, element, attrs){
            
                var wrapper = $('#navigation-bottom-wrapper');
                
	 			// On the menu open/close button click
	 			element.on('click', function(){
                	
                    if(wrapper.hasClass('close-menu-state')){
                        wrapper.addClass("open-menu-state run");
                        wrapper.removeClass('close-menu-state');
                    }
                    else{
                        wrapper.addClass("close-menu-state run");
                        wrapper.removeClass('open-menu-state');
                    }
                    
                });
	 		}
	 	};
	 }
})();