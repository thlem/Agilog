// Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
// An IIFE removes variables from the global scope
(function(){
	'use strict';
	
    angular.module("NavigationModule").service("NavigationService", NavigationService);
    
    function NavigationService(){
        // Configuration variable
	this.config = {
			isMobile            : false,				// if width < 768px
			deviceHeight        : $(window).height(),	// get height of the screen
			deviceWidth         : $(window).width(),	// get width of the screen
			isMenuOpen          : false,				// Is the menu hidden or not
			bottomClosePosition : -61,					// The bottom close position of the menu
			bottomOpenPosition  : 0,					// The bottom open position of the menu
			menuHeight          : 55					// The height of the menu
		};

	// Elements of the menu
	/*
	 * At this moment only one sublevel supported
	 */
	this.menuElements = {
 		elements:[
 			{
 				title:"Home",					// The data-title attribute, visible on hover
 				link:"#/",						// The Link, put the "null" value if there is a sub menu
 				imgSrc:"./images/homeIco.png",	// The image of the menu element
 				show:null,						// Visible condition, example ($scope.user.isOnLine)user.isOnLine
 				hide:null,						// Hidden condition, example ($scope.user.isOnLine)!user.isOnLine
 				subElements:null				// The sub menu to show
 			},
 			{
 				title:"Sign in/up - Logout",
 				link:null,
 				imgSrc:"./images/loggedIco.png",
 				show:null,
 				hide:null,
 				subElements:[				// The sub menu elements
	 				{
	 					label:"Sign in",	// The label of the link
	 					link:"#/login",		// The link
	 					show:null,			// Visible condition, example ($scope.user.isOnLine)user.isOnLine
	 					hide:"root.user"	// Hidden condition, example ($scope.user.isOnLine)!user.isOnLine
					},
					{
						label:"Logout",
	 					link:"#/logout",
	 					show:"root.user",
	 					hide:null
					},
					{
						label:"Sign up",
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
	 					label:"Project 1",
	 					link:"#/",
	 					show:null,
	 					hide:null
					},
					{
						label:"Project 2",
	 					link:"#/",
	 					show:null,
	 					hide:null 					
					},
					{
						label:"Project 3",
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
    }
    
})();