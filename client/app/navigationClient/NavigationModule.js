'use strict';
var navigationModule = angular.module("navigationModule", []);

/**
 * Service
 */
navigationModule.service("NavigationService", [function(){

	this.config = {
			isMobile            : false,
			deviceHeight        : $(window).height(),
			deviceWidth         : $(window).width(),
			isMenuOpen          : false,
			bottomClosePosition : -61,
			bottomOpenPosition  : 0,
			menuHeight          : 55
		};

	this.menuElements = {
 		elements:[
 			{
 				title:"Home",
 				link:"#/",
 				imgSrc:"./images/homeIco.png",
 				show:null,
 				hide:null,
 				subElements:null
 			},
 			{
 				title:"Sign in/up - Logout",
 				link:null,
 				imgSrc:"./images/loggedIco.png",
 				show:null,
 				hide:null,
 				subElements:[
	 				{
	 					libelle:"Sign in",
	 					link:"#/login",
	 					show:null,
	 					hide:"root.user"
					},
					{
						libelle:"Logout",
	 					link:"#/logout",
	 					show:"root.user",
	 					hide:null
					},
					{
						libelle:"Sign up",
	 					link:"#/register",
	 					show:null,
	 					hide:"root.user"
					}
				]
			},
			{
 				title:"My Account",
 				link:"#/account",
 				imgSrc:"./images/accountIco.png",
 				show:"root.user",
 				hide:null,
 				subElements:null
 			},
 			{
 				title:"My Projects",
 				link:null,
 				imgSrc:"./images/projectsIco.png",
 				show:"root.user",
 				hide:null,
 				subElements:[
	 				{
	 					libelle:"Project 1",
	 					link:"#/",
	 					show:null,
	 					hide:null
					},
					{
						libelle:"Project 2",
	 					link:"#/",
	 					show:null,
	 					hide:null 					
					},
					{
						libelle:"Project 3",
	 					link:"#/",
	 					show:null,
	 					hide:null 					
					}
				]
 			},
			{
 				title:"Home",
 				link:"#/",
 				imgSrc:"./images/homeIco.png",
 				show:null,
 				hide:null,
 				subElements:null
 			},
 			{
 				title:"Home",
 				link:"#/",
 				imgSrc:"./images/homeIco.png",
 				show:null,
 				hide:null,
 				subElements:null
 			},
 			{
 				title:"Home",
 				link:"#/",
 				imgSrc:"./images/homeIco.png",
 				show:null,
 				hide:null,
 				subElements:null
 			}
 		] 		
 	};

}]);

navigationModule.directive("navigationDir", ["NavigationService", function(NavigationService){
	return{
		restrict:"E",
		link:function(scope, element){

 			if(NavigationService.config.isMobile){
				NavigationService.config.isMobile = true;
				$("nav#navigation").css({"max-height":NavigationService.config.deviceHeight+"px"});
			}

		}
	}
}]);

/**
 * Directive for Menu open/close button
 */
 navigationModule.directive("navigationOpenCloseDir", ["NavigationService", function(NavigationService){
 	return {
 		restrict: "A",
 		template: "<span>Menu</span>",
 		link: function(scope, element, attrs){

 			

 			element.on("click", function(){

 				if(NavigationService.config.isMenuOpen){
 					var position = NavigationService.config.bottomClosePosition
 					element.removeClass("open");
 				}
 				else{
 					var position = NavigationService.config.bottomOpenPosition;
 					element.addClass("open");
 				}
 				NavigationService.config.isMenuOpen = !NavigationService.config.isMenuOpen;

 				$(this).parent().parent().clearQueue().stop().animate({
 					bottom : position+"px",
 					height:NavigationService.config.menuHeight+"px"
 				},500);
 			});

 			element.on("mouseenter", function(){

 				menuOpenCloseButton.addClass("navigation-hover");

 			});

 			element.on("mouseleave", function(){

 				menuOpenCloseButton.removeClass("navigation-hover");

 			});
 		}
 	}
 }]);

/**
 * Directive for building the navigation-bar based on Json defined in the service
 */
 navigationModule.directive("navigationDir", ["NavigationService", "$compile",
 	function(NavigationService, $compile){
 	
 	//
 	// Build the menu image element describes in "elementData" parameter
 	//
	var getMenuElement = function(elementData){
		//
		// Declare the current element
		//
 		var element = $("<li>", {"class":"navigation-middle-elements", "data-title":elementData.title, "navigation-menu-item-dir":""});

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
 			// Append the sub-menu to the main-menu
 			//
            subElement.hide();
 			element.append(subElement);
 		}

 		return element;
 	};

 	//
 	// Build the sub-menu current link describes in "subElement" parameter
 	//
 	var getMenuSubElement = function(subElement){
 		var element = null;

 		if(subElement.link){
 			element = $("<li>", {"class":"navigation-sub-middle-elements"});
 			element.append($("<a>", {"href":subElement.link, "html":subElement.libelle}));
 		}
 		else{
 			element = $("<li>", {"class":"navigation-sub-middle-elements"});
 			element.append(subElement.libelle);
 		}

 		return element;
 	};

 	return {
 		restrict: "A",
		link: function(scope, element, attrs){

			var nav = $("<nav>", {"role":"navigation", "id":"navigation"});
			var navOpenClose = $("<div>", {"id":"navigation-open-close-button", "class":"close", "navigation-open-close-dir":""});
			nav.append(navOpenClose);

			var menu = $("<ul>", {"id":"navigation-elements"});			

	 		$.each(NavigationService.menuElements.elements, function(){
	 			menu.append(getMenuElement(this));
	 		});

			nav.append(menu);

			nav = $compile(nav)(scope);
			element.append(nav);
			element.append($("<nav>", {"id":"navigation-sub"}));

			element.find("a").on("click", function(){
				NavigationService.config.isMenuOpen = !NavigationService.config.isMenuOpen;
				$("div#navigation-bottom-wrapper").clearQueue().stop().animate({
 					bottom : NavigationService.config.bottomClosePosition+"px",
 					height:NavigationService.config.menuHeight+"px"
 				},500);
			});
		}
 	}
 }]);

/**
 * Directive
 */
 navigationModule.directive("navigationMenuItemDir", ["NavigationService", function(NavigationService){
	/**
	 * @Type  : function
	 * @Param : scope   : Le scope de la directive
	 * @Param : element : L'élément HTML contenant la directive
	 */
	return function(scope, menuItemObject){

		//
		// Directive attributes initialisation
		//
		var menuItem = $(menuItemObject[0]);
		var navigationMainSubMenu = $(menuItem).find(".navigation-main-sub-menu");
		
		if(!NavigationService.config.isMobile){
			//
			// On Icon MouseEnter
			//
			menuItem.on("mouseenter", function(){
				// On ajoute la classe navigation-menu-item-hover dont l'animation
				// est géré côté CSS
				menuItem.addClass("navigation-menu-item-hover");
				// On supprime la classe ide-navigation-menu-item-title qui
				// cache le tooltip de l'élément
				menuItem.removeClass("hide-navigation-menu-item-title");
			});


			//
			// On Icon+SubMenu MouseLeave
			//
			menuItem.on("mouseleave", function(){
				//
				// Remove the class that makes the Hover effect of menuItem
				//
				menuItem.removeClass("navigation-menu-item-hover");
				
				//
				// Remove the class that makes the Tooltip hidden
				//
				menuItem.removeClass("hide-navigation-menu-item-title");
			});
		}

		//
		// On Icon Click
		//
		menuItem.on("click", function(){
			var navSubMenu = $("nav#navigation-sub");
            navSubMenu.find("ul").remove();
            
			//
			// Add the class that makes the Tooltip hidden
			//
			menuItem.addClass("hide-navigation-menu-item-title");

            var subMenuElements = $($(this).find("ul").first());

			if(subMenuElements.length > 0){
                navSubMenu.append(subMenuElements.clone());
                navSubMenu.find("ul").show();

                navSubMenu.find("a").on("click", function(){
                	NavigationService.config.isMenuOpen = !NavigationService.config.isMenuOpen;
					$("div#navigation-bottom-wrapper").clearQueue().stop().animate({
	 					bottom : NavigationService.config.bottomClosePosition+"px",
	 					height:NavigationService.config.menuHeight+"px"
	 				},500);
				});

				var height = NavigationService.config.menuHeight + navSubMenu.height() + 30;

				if(height >= NavigationService.config.deviceHeight -100){
					height -= 100;
				}

				$("div#navigation-bottom-wrapper").animate({
					height:height+"px"
				},500);
			}
			else{
				$("div#navigation-bottom-wrapper").animate({
					height:NavigationService.config.menuHeight+"px"
				},500);
			}
		});
	}
}]);
