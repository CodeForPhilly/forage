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
         */
        closeLogin: function () {
            $scope.modal.hide();
        },

        /**
         * Login Function
         * This opens up the modal and shows it
         */
        login: function () {
            $scope.modal.show();
        },

        /**
         * Performs the login action when the user submits the login form
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
                map: m.map,
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
        positions: [],
        coordinates: {
            lat: '',
            lng: ''
        },
        map: {}
    }

    // Action
    var a = $scope.action = {
        centerOnMe: function () {
            $ionicLoading.show({
                template: 'Finding your location...'
            });

            navigator.geolocation.getCurrentPosition(function(position) {

                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var marker = new google.maps.Marker({
                    map: m.map,
                    position: pos,
                    title: 'Forage Map'
                });

                // Push coordinates
                m.coordinates = {
                    lat: pos.A,
                    lng: pos.F
                };

                // Broadcast map:geolocated event to reverse geo directive
                $scope.$broadcast('map:geolocated', m.coordinates);

                m.map.setCenter(pos);
                $ionicLoading.hide();
            });
        },
        submitForm: function (address) {
            var geocoder = new google.maps.Geocoder();
            
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    m.map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: m.map,
                        position: results[0].geometry.location
                    });
                } else {
                    $scope.failureMsg = 'not successful due to ' + status;
                }
            });
        }
    };

    /**
     * Builds the google map and appends to scope.map
     * @return {Object} Google Map
     */
    function buildGmap () {
        var myLatlng = new google.maps.LatLng(39.952641,-75.164052);
        
        var mapOptions = {
            center: myLatlng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // bind 
        m.map = map;
    };

    /**
     * Builds Google Map Markers
     */
    function buildGmarkers () {
        // Build map prior before building markers
        if (angular.isUndefined(m.map)) {
            buildGmap();
        }

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
            map: m.map,
            title: 'Forage Map'
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(m.map, marker);
        });
    }

    // Initialize on load of controller
    function init () {
        
        buildGmap();
          
        // TODO
        // Wrap into a service ... app.factory
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
                        map: m.map,
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
        
        buildGmarkers();
        
    };

    init();

    // google.maps.event.addDomListener(window, 'load', initialize);
});

// Reverse Geocode Directive
// This takes in lats and lngs and gives you an address.
app.directive('reverseGeocode', function () {
    return {
        scope: true,
        link: function (scope, element, attrs) {
            // Listens for a geolocated event
            scope.$on('map:geolocated', function(event, coords) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(coords.lat, coords.lng);

                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {

                        if (results[1]) {
                            scope.success = true;
                            scope.currentAddress = results[1].formatted_address;
                        } else {
                            scope.success = false;
                            scope.failureMsg = 'Location not found';
                        }
                        
                    } else {
                        scope.success = false;
                        scope.currentAddress = 'Geocoder failed due to: ' + status;
                    }
                    scope.$apply();
                });

            });
        },
    }
});


