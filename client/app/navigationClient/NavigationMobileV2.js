'use strict';
var navigationModule = angular.module("navigationModule", []);

/**
 * Service
 */
navigationModule.service("NavigationService", [function(){

	this.config = {
			isMobile       : false,
			deviceHeight   : $(window).height(),
			deviceWidth    : $(window).width(),
			isMenuOpen     : false,
			bottomPosition : -60,
			menuHeight     : 50
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
 				subElements:[{
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
				}]
			},
			{
 				title:"Your Account",
 				link:"#/account",
 				imgSrc:"./images/accountIco.png",
 				show:"root.user",
 				hide:null,
 				subElements:null
 			},
 			{
 				title:"Project List",
 				link:"#/",
 				imgSrc:"./images/projectsIco.png",
 				show:"root.user",
 				hide:null,
 				subElements:[{
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
					libelle:"Project 2",
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
					libelle:"Project 2",
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
					libelle:"Project 2",
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
					libelle:"Project 2",
 					link:"#/",
 					show:null,
 					hide:null 					
				},
				{
					libelle:"Project 222222222",
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
					libelle:"Project 2",
 					link:"#/",
 					show:null,
 					hide:null 					
				},
				{
					libelle:"Project 2",
 					link:"#/",
 					show:null,
 					hide:null 					
				}]
 			}
 		] 		
 	};

}]);

navigationModule.directive("navigationDir", ["NavigationService", function(NavigationService){
	return{
		restrict:"E",
		link:function(scope, element){

			var mobileWidth = window.matchMedia('(max-width: 768px)'); 

 			if(mobileWidth.matches){
				NavigationService.config.isMobile = true;
				$("nav#main-navigation").css({"max-height":NavigationService.config.deviceHeight+"px"});
			}

		}
	}
}]);

/**
 * Directive for Menu open/close button
 */
 navigationModule.directive("navigationOpenCloseDir", ["NavigationService", function(NavigationService){
 	return {
 		restrict: "E",
 		template: "<span class='navigationn-open-close-button navigation-close'></span>",
 		link: function(scope, element, attrs){

 			var menuOpenCloseButton = $($(element).find("span")[0]);


 			if(NavigationService.config.isMobile){
				menuOpenCloseButton.removeClass("navigation-close");
			}

 			element.on("click", function(){

 				if(NavigationService.config.isMenuOpen){
 					NavigationService.config.bottomPosition = -60;
 					menuOpenCloseButton.addClass("navigation-close").removeClass("navigation-open");
 				}
 				else{
 					NavigationService.config.bottomPosition = 0;
 					menuOpenCloseButton.addClass("navigation-open").removeClass("navigation-close");
 				}
 				NavigationService.config.isMenuOpen = !NavigationService.config.isMenuOpen;

 				$(this).parent().clearQueue().stop().animate({
 					bottom : NavigationService.config.bottomPosition+"px"
 				},500, function(){
 					$("nav#main-navigation").animate({
						height:"50px"
					},500);
 				});
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
 		var element = $("<li>", {"class":"navigation-menu-item", "data-title":elementData.title, "navigation-menu-item-dir":""});

 		//
 		// If elementData has a link
 		//
 		if(elementData.link){
 			element.append($("<a>", {"href":elementData.link}).append($("<img>", {"src":elementData.imgSrc, "class":"navigation-menu-item-img"})));
 		}

 		//
 		// If elementData has no link, just display the image 
 		//
 		else{
	 		element.append($("<img>", {"src":elementData.imgSrc, "class":"navigation-menu-item-img"}));
	 	}

	 	//
	 	// Verification, if elementData contains a sub-element item
	 	//
 		if(elementData.subElements){

 			//
 			// Create the sub-menu element
 			//
 			var subElement = $("<ul>", {"class":"navigation-main-sub-menu"});

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
 			element = $("<li>", {"class":"navigation-all-sub-menu-item"});
 			element.append($("<a>", {"href":subElement.link, "html":subElement.libelle}));
 		}
 		else{
 			element = $("<li>", {"class":"navigation-all-sub-menu-item"});
 			element.append(subElement.libelle);
 		}

 		return element;
 	};

 	return {
 		restrict: "E",
		link: function(scope, element, attrs){

			var nav = $("<nav>", {"role":"navigation", "id":"main-navigation"});
			var navOpenClose = $("<navigation-open-close-dir>");
			nav.append(navOpenClose);

			var menu = $("<ul>", {"id":"navigation-menu"});

			var li = $("<li>", {"class":"navigation-menu-item", "data-title":"hide", "navigation-menu-item-dir":""});
			var img = $("<img>", {"src":"./images/accountIco.png", "class":"navigation-menu-item-img"});
			li.append(img);
			menu.append(li);

	 		$.each(NavigationService.menuElements.elements, function(){
	 			menu.append(getMenuElement(this));
	 		});

			nav.append(menu);

			nav = $compile(nav)(scope);
			element.append(nav);
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
		var finalTopPosition = 0;
		
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
			
			$.each($(".navigation-main-sub-menu"), function(){
				$(this).css("opacity","0");
			});

			//
			// Add the class that makes the Tooltip hidden
			//
			menuItem.addClass("hide-navigation-menu-item-title");

			if(navigationMainSubMenu.height() !== null){
				var height = NavigationService.config.menuHeight + navigationMainSubMenu.height() + 30;

				if(height >= NavigationService.config.deviceHeight -100){
					height -= 100;
				}

				var width = NavigationService.config.deviceWidth / 2;
				navigationMainSubMenu.css({"opacity":"1","width":width+"px"});

				$("nav#main-navigation").animate({
					height:height+"px"
				},500);
			}
			else{
				$("nav#main-navigation").animate({
					height:NavigationService.config.menuHeight+"px"
				},500);
			}
		});
	}
}]);