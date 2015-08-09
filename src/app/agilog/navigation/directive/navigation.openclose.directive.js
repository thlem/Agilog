(function(){
    'use strict';

	/**
	 * @name DirectiveName
	 * @description Menu open close directive that toggle display
     * @memberof ag.nav
	 */

    angular.module('ag.nav').directive('navigationOpenCloseDir', getNavigationOpenCloseDir);

    var inject = ['$timeout'];

    getNavigationOpenCloseDir.$inject = inject;

    function getNavigationOpenCloseDir($timeout){
        return{
            restrict:'A',
            link:function(scope, element){

				var wrapper = $('#navigation-bottom-wrapper');
                
	 			// On the menu open/close button click
	 			element.on('click', function(){

	 				// Prevent multiple click
                	if(!wrapper.hasClass('run')){

	                    if(wrapper.hasClass('close-menu-state')){
	                        wrapper.addClass('open-menu-state run');
	                        wrapper.removeClass('close-menu-state');
	                    }
	                    else{
	                        wrapper.addClass('close-menu-state run');
	                        wrapper.removeClass('open-menu-state');
	                        wrapper.removeClass('open-sub-menu-state');
	                        wrapper.removeClass('close-sub-menu-state');
	                        $('#navigation-sub').hide();
	                    }

	                    // Delete class that launch animation
	                    // after the animation (1s)
	                    $timeout(function(){
	                    	wrapper.removeClass('run');
	                    }, 1000);

	                }
                    
                });
            }
        }
    };
})();