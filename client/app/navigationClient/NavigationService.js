(function(){
	'use strict';
	
    /**
     * @desc The service containing menu configuration
     */

    angular.module('agilog').factory('NavigationService', getNavigationService);
    
    function getNavigationService(){

        var mobile              = true,
            deviceHeight        = null,
            deviceWidth         = null,
            bottomClosePosition = -61,
            bottomOpenPosition  = 0,
            menuOpen            = false,
            subMenuOpen         = false,
            menuHeight          = 55;

        function isMenuOpen(){
            return menuOpen;
        }
        function setMenuOpen(o){
            menuOpen = o;
        }

        function isSubMenuOpen(){
            return subMenuOpen;
        }
        function setSubMenuOpen(o){
            subMenuOpen = o;
        }

        function isMobile(){
            return mobile;
        }
        function setMobile(m){
            mobile = m;
        }

        function getDeviceHeight(){
            return deviceHeight;
        }
        function setDeviceHeight(d){
            deviceHeight = d;
        }

        function getDeviceWidth(){
            return deviceWidth;
        }
        function setDeviceWidth(d){
            deviceWidth = d;
        }

        function getBottomClosePosition(){
            return bottomClosePosition;
        }
        function setBottomClosePosition(p){
            bottomClosePosition = p;
        }

        function getBottomOpenPosition(){
            return bottomOpenPosition;
        }
        function setBottomOpenPosition(p){
            bottomOpenPosition = p;
        }

        function getMenuHeight(){
            return menuHeight;
        }
        function setMenuHeight(h){
            menuHeight = h;
        }

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
                            label:'Sign in',    // The label of the link
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

        var service = {
            isMobile                :isMobile,
            setMobile               :setMobile,
            getDeviceHeight         :getDeviceHeight,
            setDeviceHeight         :setDeviceHeight,
            getDeviceWidth          :getDeviceWidth,
            setDeviceWidth          :setDeviceWidth,
            getBottomClosePosition  :getBottomClosePosition,
            setBottomClosePosition  :setBottomClosePosition,
            getBottomOpenPosition   :getBottomOpenPosition,
            setBottomOpenPosition   :setBottomOpenPosition,
            getMenuHeight           :getMenuHeight,
            setMenuHeight           :setMenuHeight,
            getMenuElements         :getMenuElements,
            setSubMenuOpen          :setSubMenuOpen,
            isSubMenuOpen           :isSubMenuOpen,
            setMenuOpen             :setMenuOpen,
            isMenuOpen              :isMenuOpen
        };

        return service;
    }
    
})();