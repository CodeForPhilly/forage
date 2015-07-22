'use strict';
var controllername = 'mapController';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [];

    function controller() {
        var vm = this;
        vm.controllername = fullname;

        navigator.geolocation.getCurrentPosition(function (pos) {
          console.log('Got pos', pos);
          //$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          //$scope.loading.hide();
        }, function (error) {
          alert('Unable to get location: ' + error.message);
        });

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
