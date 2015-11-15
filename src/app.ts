'use strict';

/*
     app.ts
     Bootstraps Angular, rather than adding ng-app="app" into the html.
     All sub-modules are imported here
*/


import layout = require('./core/layout');

export = angular.module('app', [
    layout.name
]);