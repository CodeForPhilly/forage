'use strict';

module.exports = function(app) {
    // inject:start
    require('./mapController.controller')(app);
    // inject:end
};