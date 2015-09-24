(function() {
    'use strict';

    /**
     * @name config
     * @description The configuration of the module, containing routes, interceptor
     * @memberof ag
     */

    angular.module('ag').config(getConfig);

    var inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider'];

    getConfig.$inject = inject;

    function getConfig($httpProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        // Routes
        $stateProvider.state('Home', {
            url:'/',
            templateUrl: 'partials/home/home.html',
            title: 'Home',
            public: true
        });

        $stateProvider.state('Login', {
            url:'/login',
            templateUrl: 'partials/account/authentication/account-authentication-login-form.html',
            public: true,
            guestOnly: true
        });

         $stateProvider.state('Register', {
            url:'/register',
            templateUrl: 'partials/account/authentication/account-authentication-register-form.html',
            public: true,
            guestOnly: true
        });

         $stateProvider.state('Logout', {
            url:'/logout',
            controller: 'AuthenticationLogoutController'
        });

        $stateProvider.state('Account', {
            url:'/account',
            views: {
                '': {
                    templateUrl: 'partials/account/manage/account-manage.html'
                },
                'update-login-info@Account':{
                    templateUrl: 'partials/account/manage/account-manage-login-info-form.html',
                    controller: 'AccountManageLoginInfoController as LoginInfoCtrl'
                },
                'update-personal-info@Account':{
                    templateUrl: 'partials/account/manage/account-manage-personal-info-form.html',
                    controller: 'AccountManagePersonalInfoController as PersonalInfoCtrl'
                },
                'delete-account@Account':{
                    templateUrl: 'partials/account/manage/account-manage-delete-account.html',
                    controller: 'AccountManageController as AccMngCtrl'
                }
            }
        });

        $stateProvider.state('Project', {
            abstract: true,
            url: '/project',
            template: '<ui-view />'
        });

         $stateProvider.state('Project.List', {
            url: '/list',
            templateUrl: 'partials/project/manage/projectList.html',
            controller: 'ProjectManageProjectListController as ProjectListCtlr',
            title: 'Your project list'
        });

        $stateProvider.state('Project.Create', {
            url: '/create',
            templateUrl: 'partials/project/manage/projectCreate.html',
            controller: 'ProjectManageProjectCreateController as ProjectCreateCtlr',
            title: 'Create a new Project'
        });

        $stateProvider.state('Project.Get', {
            url: '/:projectId',
            templateUrl: 'partials/project/projectDetail.html',
            controller: 'AccountManageController as AccMngCtrl'
        });


        /**********************************************************/
        /*******************INTERCEPTOR CONFIG*********************/
        /**********************************************************/

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$rootScope',
            function($q, $location, $localStorage, $rootScope) {
                return {
                    // Ajout du token au header de la request
                    'request': function(config) {
                        $rootScope.startLoading();
                        config.headers = config.headers || {};
                        if ($localStorage.user) {
                            config.headers.Authorization = 'Bearer ' + $localStorage.user.userToken;
                        }
                        return config;
                    },
                    'response': function(response) {
                        var deferred = $q.defer();
                        $rootScope.endLoading();
                        deferred.resolve(response);
                        return deferred.promise;
                    },
                    // Traitement des réponses en erreur
                    'responseError': function(response) {
                        var deferred = $q.defer();
                        $rootScope.endLoading();
                        //
                        // * Response Code *
                        // 400 : Functionnal error
                        // 401 : If the user is not logged
                        // 403 : If the user is logged but have not the good permission
                        // 404 : Resource not found on the server
                        // 500 : Technical error
                        //

                        switch (response.status) {
                            case 400:
                                // Functional error after a form submit
                                /* NotificationFactory.addToErrorMessages(response.data.message);*/
                                return $q.reject(response);
                            case 401:
                                // User not logged
                                // Be sure client storage is clean
                                delete $localStorage.user;
                                delete $rootScope.root.user;
                                /* NotificationFactory.addToErrorMessages(response.data.message);*/
                                $location.url('/');
                                return $q.reject(response);
                            case 403:
                                // Wrong permission
                                /*  NotificationFactory.addToErrorMessages(response.data.message);*/
                                return $q.reject(response);
                            case 404:
                                // Resource not found
                                /*   NotificationFactory.addToErrorMessages('La ressource demandée est introuvable');*/
                                return $q.reject(response);
                            case 500:
                                // Technical error
                                /*   NotificationFactory.addToErrorMessages('ouch');*/
                                return $q.reject(response);
                            default:
                                // Other error not listed, resolve the promise
                                deferred.resolve(response);
                                return deferred.promise;
                        }
                    }
                };
            }
        ]);
    }
})();