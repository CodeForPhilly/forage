'use strict';
require('angular-ui-router');
require('angular-sanitize');
require('angular-animate');
require('ionic');
require('ionic-angular');
require('angular-material');
require('ng-cordova');

var modulename = 'uforage';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'ionic', 'ngCordova', 'ngMaterial']);
    // inject:folders start
    require('./controllers')(app);
    // inject:folders end

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/map');
        $stateProvider.state('home', {
            url: '/',
            template: require('./views/home.html')
        });
        $stateProvider.state('map', {
            url: '/map',
            controller: 'main.uforage.mapController',
            template: require('./views/map.html')
        })
    };
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    return app;
};
