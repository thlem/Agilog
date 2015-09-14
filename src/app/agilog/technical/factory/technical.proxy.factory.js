(function() {
    'use strict';

    /**
     * @name ProxyFactory
     * @description Factory that offers methods relative to the api communication
     * @memberof ag.tech
     */

    angular.module('ag.tech').factory('ProxyFactory', getProxyFactory);

    var inject = ['$location', '$http', '$q'];
    getProxyFactory.$inject = inject;

    function getProxyFactory($location, $http, $q) {

        /**
         * Public method that are accessible
         * @type {Object}
         */
        var ret = {
            redirect: redirect,
            sendPostRequest: sendPostRequest,
            sendGetRequest: sendGetRequest
        };
        return ret;

        // Change the url, does'nt call the server
        function redirect(link) {
            $location.url(link);
        }

        function sendPostRequest(link, jsonData) {
            return $q(function(resolve, reject) {
                $http.post(link, jsonData)
                    .then(function(response) {
                        resolve(response.data);
                    })
                    .catch(function(response) {
                        reject(response.data);
                    });
            });
        }

        function sendGetRequest(link) {
            return $q(function(resolve, reject) {
                $http.get(link)
                    .then(function(response) {
                        if (response.data) {
                            resolve(response.data);
                        } else {
                            resolve();
                        }
                    })
                    .catch(function(response) {
                        if (response.data) {
                            reject(response.data);
                        } else {
                            reject();
                        }
                    });
            });
        }

    }

})();