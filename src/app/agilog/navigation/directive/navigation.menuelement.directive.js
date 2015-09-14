(function() {
    'use strict';

    /**
     * @name DirectiveName
     * @description The menu element (icon) directive, display submenu or go to link
     * @memberof ag.nav
     */

    angular.module('ag.nav').directive('navigationMenuElementDir', getNavigationMenuElementDir);

    var inject = ['$timeout'];

    getNavigationMenuElementDir.$inject = inject;

    function getNavigationMenuElementDir($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {

                    var subMenuContent = element.find('.navigation-sub-elements')[0],
                        subMenu = $('#navigation-sub'),
                        titleElement = $('.navigation-title'),
                        navElement = $('#navigation'),
                        parent = $('#navigation-wrapper');
                    var wrapper = $('#navigation-wrapper');

                    subMenu.find('ul').remove();

                    if (!wrapper.hasClass('run')) {

                        // If there is none submenu
                        if (!subMenuContent) {
                            if (wrapper.hasClass('state2')) {
                                wrapper.addClass('state0 state2to0 run');
                                wrapper.removeClass('state1 state2');
                                $timeout(function() {
                                    wrapper.removeClass('state2to0 run');

                                }, 800);
                            } else {
                                // Close the menu on element click
                                wrapper.addClass('state0 state1to0 run');
                                wrapper.removeClass('state1 state2');

                                $timeout(function() {
                                    wrapper.removeClass('state1to0 run');

                                }, 800);
                            }
                        }
                        // If there is submenu content
                        else {

                            // If the subnav is display and antoher click
                            // is fire on the element, hide subnav
                            if (wrapper.hasClass('state2')) {
                                wrapper.addClass('state1 state2to1 run');
                                wrapper.removeClass('state0 state2');

                                $timeout(function() {
                                    wrapper.removeClass('state2to1 run');

                                }, 800);
                            } else {

                                // We clone the submenu content 
                                var subClone = $(subMenuContent).clone();
                                // Append to the subnav and show it
                                subMenu.append(subClone);
                                subMenu.show();

                                wrapper.addClass('state2 state1to2 run');
                                wrapper.removeClass('state0 state1');

                                $timeout(function() {
                                    wrapper.removeClass('state1to2 run');

                                }, 800);

                                subMenu.find('a').click(function() {
                                    wrapper.addClass('state0 state2to0 run');
                                    wrapper.removeClass('state1 state2');
                                    $timeout(function() {
                                        wrapper.removeClass('state2to0 run');

                                    }, 800);
                                });

                            }

                        }

                    }

                });
            }
        };
    }
})();