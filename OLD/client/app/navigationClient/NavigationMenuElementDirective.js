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

				element.on('click', function(){

					var subMenuContent = element.find('.navigation-sub-elements')[0],
						subMenu        = $('#navigation-sub'),
						titleElement   = $('.navigation-title'),
						navElement     = $('#navigation'),
                        parent         = $('#navigation-bottom-wrapper');
                    var wrapper = $('#navigation-bottom-wrapper');
                    
                    subMenu.find('ul').remove();
					
					if(!subMenuContent){
					 	wrapper.addClass('close-menu-state run');
					 	wrapper.removeClass('open-menu-state');
					}
					else{
                    
                        var subClone = $(subMenuContent).clone();
                        
						subMenu.append(subClone);
                        subMenu.show();
                        
                        
						wrapper.addClass('open-sub-menu-state run');
						
					}

				});
			}
		};
	}
})();