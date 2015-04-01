// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var forage = angular.module('starter', ['ionic', 'starter.controllers', 'firebase'])

forage.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
/*
  .state('app.vendors', {
    url: "/vendorz",
    views: {
      'menuContent': {
        templateUrl: "templates/vendors.html"
      }
    }
  })*/
    .state('app.vendors', {
      url: "/vendors",
      views: {
        'menuContent': {
          templateUrl: "templates/vendors.html",
          controller: 'VendorsCtrl'
        }
      }
    })

   .state('login', {
      url: "/login",
      views: {
        'menuContent': {
          templateUrl: "templates/login.html",
          controller: 'AppCtrl'
        }
      }
    })

  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/map.html",
        controller: 'MapCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/vendors');
});

forage.controller("loginCtrl", function($scope,$rootScope,$firebase, $firebaseSimpleLogin){
  // Get a reference to the Firebase
  var firebaseref = new Firebae("https://foragemap.firebaseio.com/");

   // Create a Firebase Simple Login object
   $scope.auth = $firebaseSimpleLogin(firebaseref);

   // Initially set no user to be logged in
   $scope.user = null;

   // Logs a user in with inputted provider
   $scope.login = function(provider) {
    $scope.auth.$login(provider);
   };

   $scope.logout = function() {
    $scope.auth.$logout();
   };
    // Upon successful logout, reset the user object
   $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
    $scope.user = user;
   });
    // Upon successful logout, reset user object
   $rootScope.$on("firebaseSimpleLogin:logout", function(event, user) {
    $scope.user = null;
   });

    // Log any log-in related errors to console
   $rootScope.$on("firebaseSimpleLogin:error", function(event, user) {
    console.log("Error logging user in: ", error);
 });
});
