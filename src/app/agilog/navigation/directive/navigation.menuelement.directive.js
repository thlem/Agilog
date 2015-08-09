(function(){
    'use strict';

	/**
	 * @name DirectiveName
	 * @description The menu element (icon) directive, display submenu or go to link
     * @memberof ag.nav
	 */

    angular.module('ag.nav').directive('navigationMenuElementDir', getNavigationMenuElementDir);

    var inject = ['$timeout'];

    getNavigationMenuElementDir.$inject = inject;

    function getNavigationMenuElementDir($timeout){
        return{
            restrict:'A',
            link:function(scope, element){
            	element.on('click', function(){

					var subMenuContent = element.find('.navigation-sub-elements')[0],
						subMenu        = $('#navigation-sub'),
						titleElement   = $('.navigation-title'),
						navElement     = $('#navigation'),
                        parent         = $('#navigation-bottom-wrapper');
                    var wrapper = $('#navigation-bottom-wrapper');
                    
                    subMenu.find('ul').remove();

                    if(!wrapper.hasClass('run')){
					
						// If there is none submenu
						if(!subMenuContent){
							// Close the menu on element click
						 	wrapper.addClass('close-menu-state run');
						 	wrapper.removeClass('open-menu-state');
						 	wrapper.removeClass('close-sub-menu-state');
						 	wrapper.removeClass('open-sub-menu-state');
						 	subMenu.hide();
						}
						// If there is submenu content
						else{

							// If the subnav is display and antoher click
							// is fire on the element, hide subnav
							if(wrapper.hasClass('open-sub-menu-state')){
								wrapper.removeClass('open-sub-menu-state');
								wrapper.addClass('close-sub-menu-state run');
							}
							else{

								// We clone the submenu content 
		                        var subClone = $(subMenuContent).clone();
		                        // Append to the subnav and show it
								subMenu.append(subClone);
	                        	subMenu.show();

								wrapper.removeClass('close-sub-menu-state');
								wrapper.addClass('open-sub-menu-state run');
							}

						}

						// Delete class that launch animation
	                    // after the animation (1s)
	                    $timeout(function(){
	                    	wrapper.removeClass('run');
	                    }, 1000);
	                }

				});
            }
        };
    }
})();