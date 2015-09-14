(function() {
    'use strict';

    /**
     * @name AccountModule
     * @description The account module that includes auth and manage
     * @namespace ag.acc
     */

    angular.module('ag.acc', [
        'ag.acc.auth',
        'ag.acc.manage'
    ]);
})();