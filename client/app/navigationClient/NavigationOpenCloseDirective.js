// Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
// An IIFE removes variables from the global scope
(function(){
	'use strict';

	/**
	 * @desc Directive for Menu open/close button
	 * @example <div id="navigation-open-close-button" class="close" navigation-open-close-dir></div>
	 */

	angular.module("NavigationModule").directive("navigationOpenCloseDir", navigationOpenCloseDir);

    navigationOpenCloseDir.$inject = ["NavigationService"];
    
	function navigationOpenCloseDir(NavigationService){
		return {
	 		restrict: "A",
	 		template: "<span>Menu</span>",
	 		link: function(scope, element, attrs){
	 			// On the menu open/close button click
	 			element.on("click", function(){

	 				// Bottom position of the menu
	 				var position = 0;

	 				// If the menu is already open
	 				if(NavigationService.config.isMenuOpen){
	 					// Set the position to hide the menu
	 					position = NavigationService.config.bottomClosePosition;
	 					element.removeClass("open");
	 				}
	 				else{
						// Set the position to show the menu
	 					position = NavigationService.config.bottomOpenPosition;
	 					element.addClass("open");
	 				}
	 				// Set the boolean open / close
	 				NavigationService.config.isMenuOpen = !NavigationService.config.isMenuOpen;

	 				// Select the nav element, clear and stop animation queue
	 				// to prevent multiple open / close effect
	 				$(this).parent().parent().clearQueue().stop().animate({
	 					bottom : position+"px",								// The bottom position
	 					height:NavigationService.config.menuHeight+"px"		// Reset the height of nav to origin height (55px by default)
	 				},500);
	 			});
	 		}
	 	}
	 }
})();