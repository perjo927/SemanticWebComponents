/*jshint browser:true */
'use strict';

/*
    bootstrap.ts
    Bootstraps Angular, rather than adding ng-app="app" into the html.
*/

import "./vendor"; // Load all vendor dependencies

import appModule = require('../app'); // Load the main app file and its imports

angular.element(document).ready(function () {
    angular.bootstrap(document, [appModule.name], {}); // replaces ng-app="appName"
});

