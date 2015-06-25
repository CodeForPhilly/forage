var app = angular.module('starter.controllers', ['angularReverseGeocode']);

app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Actions
    var a = $scope.action = {
        /**
         * Close Login
         * Triggered in the login modal to close it
         * 
         * @return NONE
         */
        closeLogin: function () {
            $scope.modal.hide();
        },

        /**
         * Login Function
         * This opens up the modal and shows it
         * 
         * @return NONE
         */
        login: function () {
            $scope.modal.show();
        },

        /**
         * Performs the login action when the user submits the login form
         * @return NONE
         */
        doLogin: function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        },

    }

    // TODO: Make into a service:
    //http requests to remote server
    $http.get('https://foragemap.firebaseio.com/.json').then(function(resp) {
        $scope.conditions = resp.data.conditions;

        _.each(resp.data, function(datum) {
            new google.maps.Marker({
                position: datum.l,
                map: map,
                title: 'Forage Map'
            });
        })
        //call each response and loop through the data
        console.log('Success', resp); // console.log('Success', resp.data.Foo_Truck);  
        // For JSON responses, resp.data contains the result
    }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
  })
})



 // GOOGLE MAPS
app.controller('MapCtrl', function($scope, $ionicLoading, $compile, $http) {
    
    // Model
    var m = $scope.model = {
        coordinates: {
            lat: '',
            lng: ''
        }
    }

    // Action
    var a = $scope.action = {
        centerOnMe: function () {
            $scope.positions = [];

            $ionicLoading.show({
                template: 'Loading...'
            });

            navigator.geolocation.getCurrentPosition(function(position) {

                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: pos,
                    title: 'Forage Map'
                });

                // Push coordinates
                m.coordinates = {
                    lat: pos.A,
                    lng: pos.F
                };

                // Broadcast map:geolocated event
                $scope.$broadcast('map:geolocated', m.coordinates);

                $scope.map.setCenter(pos);
                $ionicLoading.hide();
            });
        }
    };

    // Initialize on load of controller
    function init () {
        var myLatlng = new google.maps.LatLng(39.952641,-75.164052);
        
        var mapOptions = {
            center: myLatlng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
          
        $http.get('https://foragemap.firebaseio.com/.json')
            .then(function(resp) {
                // If successful 
                $scope.conditions = resp.data.conditions;
                
                // loop through each object in data 
                _.each(resp.data, function(data) {
                    console.log(resp.data)
                
                    // create marker for each object
                    new google.maps.Marker({
                        position: { 
                            lat: data.l[0],
                            lng: data.l[1]
                        },
                        map: map,
                        title: 'Forage Map'
                    });
                })
            //call each response and loop through the data
            //  console.log('Success', resp); // console.log('Success', resp.data.Foo_Truck);  
            // For JSON responses, resp.data contains the result
            }, function(err) {
                console.error('~~~ERROR', err);
                // err.status will contain the status code
            })

        //Marker + infowindow + angularjs compiled ng-click
  
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });
        
        var marker = new google.maps.Marker({
            position: {
                lat: 39.952641,
                lng: -75.164052
            },
            map: map,
              title: 'Forage Map'
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });

        $scope.map = map;
    };

    init();

    // google.maps.event.addDomListener(window, 'load', initialize);
});

// Reverse Geocode Directive
// This takes in lats and lngs and gives you an address.
app.directive('reverseGeocode', function () {
    return {
        scope: true,
        restrict: 'A',
        template: '<div></div>',
        link: function (scope, element, attrs) {
            // Listens for a geolocated event
            scope.$on('map:geolocated', function(event, coords) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(coords.lat, coords.lng);

                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            element.text(results[1].formatted_address);
                        } else {
                            element.text('Location not found');
                        }
                    } else {
                        element.text('Geocoder failed due to: ' + status);
                    }
                });

            });
        },
        replace: true
    }
});


/*var marker = new google.maps.Marker({
      position: { lat: 39.96, lng: -75.2 }
      });*/


/*new google.maps.Marker({
            position: { lat: pos.k,lng: pos.B},
            map: map,
              title: 'Forage Map'
      });*/


