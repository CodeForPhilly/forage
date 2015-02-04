angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.vendors = [
    { vendor: 'Jerk Chicken Man', id: 1 },
    { vendor: 'Foo Truck', id: 2 },
    { vendor: 'Mucho Bueno', id: 3 },
    { vendor: 'Pitrucco Truck', id: 4 },
    { vendor: 'Meals on Wheels', id: 5 },
    { vendor: 'Vege Friendly', id: 6 }
  ];
})

.controller('MapCtrl', function($scope) {
  $scope.vendors = [
    { vendor: 'Jerk Chicken Man', id: 1 },
    { vendor: 'Foo Truck', id: 2 },
    { vendor: 'Mucho Bueno', id: 3 },
    { vendor: 'Pitrucco Truck', id: 4 },
    { vendor: 'Meals on Wheels', id: 5 },
    { vendor: 'Vege Friendly', id: 6 }
  ];
  //Map Init code here
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});


