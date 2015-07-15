// Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
// An IIFE removes variables from the global scope
(function(){
	'use strict';

	/**
	 * @desc The main directive of the module
	 * @example <div id="navigation-bottom-wrapper" navigation-dir></div>
	 */

	angular.module("agilogClient").directive("navigationDir", navigationDir);

    navigationDir.$inject = ["NavigationService", "$compile"];
    
	function navigationDir(NavigationService, $compile){
		return{
			restrict:"E", // On attribute only
			template:'<div id="navigation-bottom-wrapper" ng-controller="NavigationController">'+
    					'<nav id="navigation" role="navigation">'+
        					'<div id="navigation-open-close-button" class="close" navigation-open-close-dir>'+
            					'<span>Menu</span>'+
        					'</div>'+
        					'<ul id="navigation-elements">'+
            					'<li ng-repeat="element in menuElements" class="navigation-element" data-title="{{ element.title }}" navigation-menu-element-dir>'+
                					'<a href="{{ element.link }}" ng-if="element.link">'+
                    					'<img src="{{ element.imgSrc }}" />'+
                					'</a>'+
                					'<img src="{{ element.imgSrc }}" ng-if="!element.link" />'+
                					'<ul class="navigation-sub-elements" ng-if="element.subElements">'+
                    					'<li class="navigation-sub-element" ng-repeat="subElement in element.subElements">'+
                        					'<a href="{{ subElement.link }}">{{ subElement.label }}</a>'+
                    					'</li>'+
                					'</ul>'+
            					'</li>'+
        					'</ul>'+
    					'</nav>'+
                        '<nav id="navigation-sub"></nav>'+
					'</div>',
			compile:function(scope, element){

				// Get the device width
				var mediaWidth = window.matchMedia('(max-width: 768px)');
				// If we are less than 768px
				if(mediaWidth.matches){
					NavigationService.config.isMobile = true;
				}
			}
		}
	}
})();