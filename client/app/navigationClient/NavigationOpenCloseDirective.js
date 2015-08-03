(function(){
	'use strict';

	/**
	 * @desc Directive for Menu open/close button
	 * @example <div id="navigation-open-close-button" class="close" navigation-open-close-dir></div>
	 */

	angular.module('agilog').directive('navigationOpenCloseDir', getNavigationOpenCloseDir);

    getNavigationOpenCloseDir.$inject = ['NavigationService'];
    
	function getNavigationOpenCloseDir(NavigationService){
		return {
	 		restrict: 'A',
	 		link: function(scope, element, attrs){
	 			// On the menu open/close button click
	 			element.on('click', function(){

	 				// Bottom position of the menu
	 				var position = 0;

	 				// If the menu is already open
	 				if(NavigationService.isMenuOpen()){
	 					// Set the position to hide the menu
	 					position = NavigationService.getBottomClosePosition();
	 				}
	 				else{
						// Set the position to show the menu
	 					position = NavigationService.getBottomOpenPosition();
	 				}
	 				// Set the boolean open / close
	 				NavigationService.setMenuOpen(!NavigationService.isMenuOpen());
	 				NavigationService.setSubMenuOpen(false);

	 				// Select the nav element, clear and stop animation queue
	 				// to prevent multiple open / close effect
	 				$('div#navigation-bottom-wrapper').clearQueue().stop().animate({
	 					bottom : position+'px',								// The bottom position
	 					// Reset the height of nav to origin height (55px by default)
	 					height:NavigationService.getMenuHeight()+'px'
	 				},500);
	 			});
	 		}
	 	};
	 }
})();