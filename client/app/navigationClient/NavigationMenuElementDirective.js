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
                    
                    subMenu.find('ul').remove();
					
					if(!subMenuContent){
						titleElement.addClass('close');
                        navElement.addClass("close");
                        titleElement.removeClass('open');
                        navElement.removeClass("open");
					}
					else{
                    
                        var subClone = $(subMenuContent).clone();
                        
						subMenu.append(subClone);
                        subMenu.show();
                        
                        
						parent.addClass("move");
						
					}

				});
			}
		};
	}
})();