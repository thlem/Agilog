(function(){
	'use strict';

	/**
	 * @desc Directive for each main element of the menu
	 * @example
	 * <li class=navigation-element data-title:"any" navigation-menu-element-dir>
	 * 	<a><img /></a>
	 * </li>
	 */

	angular.module('agilog').directive('navigationMenuElementDir', getNavigationMenuElementDir);

    getNavigationMenuElementDir.$inject = ['NavigationService'];
        
	function getNavigationMenuElementDir(NavigationService){
		return{
			restrict: 'A',
			link: function(scope, element, attrs){
				//
				// Directive attributes initialisation
				//
				var menuItem = $(element[0]);
				var navigationMainSubMenu = $(menuItem).find('.navigation-main-sub-menu');
                var subMenuOpen = false;

				//
				// On Icon Click
				//
				menuItem.on('click', function(){

					// Find the sub menu to show
					var navSubMenu = $('nav#navigation-sub');
					// Clear its content
		            navSubMenu.find('ul').remove();
		            
		            // Find the sub menu elements of the current item
		            var subMenuElements = $($(this).find('ul').first());

		            // If the current item has sub menu elements
					if(subMenuElements.length > 0){
                    
                        if(!subMenuOpen){
                            // We append all into the sub menu
                            navSubMenu.append(subMenuElements.clone());
                            // And show it
                            navSubMenu.find('ul').show();

                            // Catch click on sub menu link to reset the menu position
                            navSubMenu.find('a').on('click', function(){
                                $('div#navigation-bottom-wrapper').clearQueue().stop().animate({
                                    bottom : NavigationService.config.bottomClosePosition+'px',	// reset the position
                                    height:NavigationService.config.menuHeight+'px'				// reset the height
                                },500);
                                subMenuOpen = false;
                            });

                            // When we click on an main item that has sub elements, we set the position with a 30px add
                            // Otherwise the sub elements are close of the bottom of the page
                            var height = NavigationService.config.menuHeight + navSubMenu.height() + 30;

                            // If the current height is greater than the device height, we remove 100px
                            if(height >= NavigationService.config.deviceHeight -100){
                                height -= 100;
                            }

                            $('div#navigation-bottom-wrapper').animate({
                                height:height+'px'	// set the height
                            },500);
                            subMenuOpen = false;
                        }
                        else{
                             $('div#navigation-bottom-wrapper').clearQueue().stop().animate({
                                bottom : NavigationService.config.bottomClosePosition+'px',	// reset the position
                                height:NavigationService.config.menuHeight+'px'				// reset the height
                            },500);
                            subMenuOpen = false;
                        }
					}
					else{
						// If there is no sub elements, we juste close the menu and the view is visible
	                    $('div#navigation-bottom-wrapper').clearQueue().stop().animate({
	                        bottom : NavigationService.config.bottomClosePosition+'px',	// reset the position
	                        height:NavigationService.config.menuHeight+'px'				// reset the height
	                    },500);
					}
				});
			}
		};
	}

})();