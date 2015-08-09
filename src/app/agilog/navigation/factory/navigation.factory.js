(function(){
	'use strict';
	
    /**
     * @name NavigationFactory
     * @description factory description
     * @memberof ag.nav
     */

    angular.module('ag.nav').factory('NavigationFactory', getNavigationFactory);
    
	var inject = [];
	getNavigationFactory.$inject = inject;

    function getNavigationFactory(){

		/**
		 * Public method that are accessible
		 * @type {Object}
		 */
		var ret = {
			getMenuElements:getMenuElements
		};
		return ret;

		// Elements of the menu
        /*
         * At this moment only one sublevel supported
         */
        function getMenuElements(){
            return [
                {
                    title:'Home',                   // The data-title attribute, visible on hover
                    link:'#/',                      // The Link, put the 'null' value if there is a sub menu
                    imgSrc:'./images/homeIco.png',  // The image of the menu element
                    hide:null,                      // Hidden condition, example ($scope.user.isOnLine)!user.isOnLine
                    subElements:null                // The sub menu to show
                },
                {
                    title:'Sign in/up - Logout',
                    link:null,
                    imgSrc:'./images/loggedIco.png',
                    hide:null,
                    subElements:[               // The sub menu elements
                        {
                            label:'Sign inSign inSign in',    // The label of the link
                            link:'#/login',     // The link
                            hide:'root.user'    // Hidden condition, example ($scope.user.isOnLine)!user.isOnLine
                        },
                        {
                            label:'Logout',
                            link:'#/logout',
                            hide:'!root.user'
                        },
                        {
                            label:'Sign up',
                            link:'#/register',
                            hide:'root.user'
                        }
                    ]
                },
                {
                    title:'My Account',
                    link:'#/account',
                    imgSrc:'./images/accountIco.png',
                    hide:'!root.user',
                    subElements:null
                },
                {
                    title:'My Projects',
                    link:null,
                    imgSrc:'./images/projectsIco.png',
                    hide:'!root.user',
                    subElements:[
                        {
                            label:'Project 1',
                            link:'#/',
                            hide:null
                        },
                        {
                            label:'Project 2',
                            link:'#/',
                            hide:null                   
                        },
                        {
                            label:'Project 3',
                            link:'#/',
                            hide:null                   
                        }
                    ]
                }
            ];
        }

    }

})();