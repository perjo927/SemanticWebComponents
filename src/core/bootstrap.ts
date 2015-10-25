/*jshint browser:true */
'use strict';
// load Angular
import angular = require('angular');
// load the main app file
import appModule = require('../app');

// replaces ng-app="appName"
angular.element(document).ready(function () {
    angular.bootstrap(document, [appModule.name], {
        //strictDi: true
    });
});