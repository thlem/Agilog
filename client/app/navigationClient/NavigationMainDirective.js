// Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
// An IIFE removes variables from the global scope
(function(){
	'use strict';

	/**
	 * @desc The main directive of the module
	 * @example <div id="navigation-bottom-wrapper" navigation-dir></div>
	 */

	angular.module("NavigationModule").directive("navigationDir", navigationDir);

    navigationDir.$inject = ["NavigationService", "$compile"];
    
	function navigationDir(NavigationService, $compile){
		return{
			restrict:"A", // On attribute only
			link:function(scope, element){

				// Get the device width
				var mediaWidth = window.matchMedia('(max-width: 768px)');
				// If we are less than 768px
				if(mediaWidth.matches){
					NavigationService.config.isMobile = true;
				}

				// Build nav item
				var nav = $("<nav>", {"role":"navigation", "id":"navigation"});
				// Build the open/close button
				var navOpenClose = $("<div>", {"id":"navigation-open-close-button", "class":"close", "navigation-open-close-dir":""});
				// Add the open close button to thenav item
				nav.append(navOpenClose);

				// Build the menu elements
				var menu = $("<ul>", {"id":"navigation-elements"});			

				// For each elements in the service json menuElements
		 		$.each(NavigationService.menuElements.elements, function(){
		 			// Append to the menu the current element
		 			menu.append(getMenuElement(this));
		 		});

		 		// After building menu elements, append it to the nav
				nav.append(menu);

				// compilation for rendering the nav element
				nav = $compile(nav)(scope);
				// Add to the div element the nav
				element.append(nav);
				// Build the submenu that will show the sub elements
				element.append($("<nav>", {"id":"navigation-sub"}));

				// Catch onClick to the link of main element to reset the position of the menu
				element.find("a").on("click", function(){
					NavigationService.config.isMenuOpen = !NavigationService.config.isMenuOpen;
					$("div#navigation-bottom-wrapper").clearQueue().stop().animate({
	 					bottom : NavigationService.config.bottomClosePosition+"px", // reset the position
	 					height:NavigationService.config.menuHeight+"px"				// reset the height
	 				},500);
				});
			}
		}
	}

	//
 	// Build the menu image element describes in "elementData" parameter
 	//
	var getMenuElement = function(elementData){
		//
		// Declare the current element
		//
 		var element = $("<li>", {"class":"navigation-element", "data-title":elementData.title, "navigation-menu-element-dir":""});

 		//
 		// If elementData has a link
 		//
 		if(elementData.link){
 			element.append($("<a>", {"href":elementData.link}).append($("<img>", {"src":elementData.imgSrc})));
 		}

 		//
 		// If elementData has no link, just display the image 
 		//
 		else{
	 		element.append($("<img>", {"src":elementData.imgSrc}));
	 	}

	 	//
	 	// Verification, if elementData contains a sub-element item
	 	//
 		if(elementData.subElements){

 			//
 			// Create the sub-menu element
 			//
 			var subElement = $("<ul>", {"class":"navigation-sub-elements"});

 			//
 			// for each sub-menu element in elementData.subElements
 			//
 			$.each(elementData.subElements, function(){
 				//
 				// Call of build method for sub-element-item
 				//
 				subElement.append(getMenuSubElement(this));
 			});
 			//
 			// Append the sub-menu to the main-menu and hide it
 			//
            subElement.hide();
 			element.append(subElement);
 		}

 		return element;
 	}

 	//
 	// Build the sub-menu element describes in "subElement" parameter
 	//
 	var getMenuSubElement = function(subElement){
 		var element = null;

 		// If the subElement has a link value, this is our current link to append
 		if(subElement.link){
 			element = $("<li>", {"class":"navigation-sub-element"});
 			element.append($("<a>", {"href":subElement.link, "html":subElement.label}));
 		}
 		else{
 			element = $("<li>", {"class":"navigation-sub-element"});
 			element.append(subElement.label);
 		}

 		return element;
 	}
})();