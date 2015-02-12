angular.module('starter.controllers', [])

.controller('AppzCtrl', function($scope, $ionicModal, $timeout) {
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

 // GOOGLE MAPS
.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
 
  $scope.init = function() {
        var myLatlng = new google.maps.LatLng(39.952641,-75.164052);
        var mapOptions = {
          center: myLatlng,
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
      
   //Marker + infowindow + angularjs compiled ng-click
  
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });
        var marker = new google.maps.Marker({
        position: { lat: 39.952641, lng: -75.164052},
        map: map,
          title: 'Forage Map'
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });
        $scope.map = map;
    };
    // google.maps.event.addDomListener(window, 'load', initialize);
    $scope.centerOnMe = function() {
        if(!$scope.map) {return;}

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
    };
    $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
    };
})



