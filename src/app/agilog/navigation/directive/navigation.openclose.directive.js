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

	                    if(wrapper.hasClass('state1')){
                            wrapper.addClass('state0 state1to0 run');
	                        wrapper.removeClass('state1');
                            
                            $timeout(function(){
                                wrapper.removeClass('state1to0 run');
                                
                            },1000);
	                    }
                        else if(wrapper.hasClass('state2')){
                            wrapper.addClass('state0 state2to0 run');
                            wrapper.removeClass('state1 state2');
                            $timeout(function(){
                                wrapper.removeClass('state2to0 run');
                                
                            },1000);
                        }
	                    else{
                            wrapper.addClass('state1 state0to1 run');
	                        wrapper.removeClass('state0');
                            
                            $timeout(function(){
                                wrapper.removeClass('state0to1 run');
                                
                            },1000);
	                    }

	                }
                    
                });
            }
        }
    };
})();