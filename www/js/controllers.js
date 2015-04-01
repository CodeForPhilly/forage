angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {
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





  //http requests to remote server

  $http.get('http://echo.jsontest.com/conditions/frightful').then(function(resp) {
    $scope.conditions = resp.data.conditions;
        //console.log('Success', resp);
    // For JSON responses, resp.data contains the result
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  })
})






.controller('VendorsCtrl', function($scope) {
  $scope.vendors = [
    { vendor: 'Jerk Chicken Man \n + yo', id: 1 },
    { vendor: 'Foo Truck', id: 2 },
    { vendor: 'Mucho Bueno', id: 3 },
    { vendor: 'Pitrucco Truck', id: 4 },
    { vendor: 'Meals on Wheels', id: 5 },
    { vendor: 'Vege Friendlyfriendly', id: 6 }
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

  $scope.centerOnMe= function(){
  $scope.positions = [];
    
    
    $ionicLoading.show({
      template: 'Loading...'
    });


    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.positions.push({lat: pos.k,lng: pos.B});
      console.log(pos);
      $scope.map.setCenter(pos);
      $ionicLoading.hide();
    });
  };
});



