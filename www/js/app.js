// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var forage = angular.module('starter', ['ionic', 'starter.controllers'])

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

.controller('VendorsCtrl', function($scope) {
  $scope.vendors = [
    { vendor: 'Jerk Chicken Man', id: 1 },
    { vendor: 'Foo Truck', id: 2 },
    { vendor: 'Mucho Bueno', id: 3 },
    { vendor: 'Pitrucco Truck', id: 4 },
    { vendor: 'Meals on Wheels', id: 5 },
    { vendor: 'Vege Friendlyfriendly', id: 6 }
  ];
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

  .state('app.vendorz', {
    url: "/vendorz",
    views: {
      'menuContent': {
        templateUrl: "templates/vendorz.html"
      }
    }
  })
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
  $urlRouterProvider.otherwise('/app/vendorz');
});

var ref = new Firebase("https://social-autho.firebaseio.com/");
ref.authWithOAuthPopup("twitter", function(error, authData) {
  if (error) {
    console.log("Login Faield!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});

