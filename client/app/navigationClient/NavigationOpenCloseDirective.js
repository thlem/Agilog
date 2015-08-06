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
	 			// On the menu open/close button click
	 			element.on('click', function(){
                
                    if(element.hasClass('close')){
                        element.addClass('open');
                        $("#navigation").addClass("open");
                        element.removeClass('close');
                        $("#navigation").removeClass("close");
                    }
                    else{
                        element.addClass('close');
                        $("#navigation").addClass("close");
                        element.removeClass('open');
                        $("#navigation").removeClass("open");
                    }
                    $compile(element)(scope);
                });
	 		}
	 	};
	 }
})();