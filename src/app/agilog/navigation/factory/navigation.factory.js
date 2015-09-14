(function() {
    'use strict';

    /**
     * @name NavigationFactory
     * @description The factory that contains menu elements
     * @memberof ag.nav
     */

    angular.module('ag.nav').factory('NavigationFactory', getNavigationFactory);

    var inject = [];
    getNavigationFactory.$inject = inject;

    function getNavigationFactory() {

        /**
         * Public method that are accessible
         * @type {Object}
         */
        var ret = {
            getMenuElements: getMenuElements
        };
        return ret;

        // Elements of the menu
        /*
         * At this moment only one sublevel supported
         */
        function getMenuElements() {
            return [{
                title: 'Home', // The data-title attribute, visible on hover
                link: 'Home', // The Link, put the 'null' value if there is a sub menu
                imgSrc: './images/homeIco.png', // The image of the menu element
                hide: null, // Hidden condition, example ($scope.user.isOnLine)!user.isOnLine
                subElements: null // The sub menu to show
            }, {
                title: 'Sign in/up',
                link: null,
                imgSrc: './images/loggedIco.png',
                hide: 'root.user',
                subElements: [ // The sub menu elements
                    {
                        label: 'Sign in', // The label of the link
                        link: 'Login', // The link
                        hide: 'root.user' // Hidden condition, example ($scope.user.isOnLine)!user.isOnLine
                    }, {
                        label: 'Sign up',
                        link: 'Register',
                        hide: 'root.user'
                    }
                ]
            }, {
                title: 'Logout',
                link: 'Logout',
                imgSrc: './images/loggedIco.png',
                hide: '!root.user',
                subElements: null
            }, {
                title: 'My Account',
                link: 'Account',
                imgSrc: './images/accountIco.png',
                hide: '!root.user',
                subElements: null
            }];
        }

    }

})();