/*jshint browser:true */
'use strict';

/*
    bootstrap.ts
    Bootstraps Angular, rather than adding ng-app="app" into the html.
*/

import "./vendor"; // Load all vendor dependencies

import appModule = require('../app'); // Load the main app file and its imports

// This bootstrapping replaces ng-app="appName"
angular.element(document).ready(function () {
    // appModule.name will be taken from app.ts, for instance "app": angular.module('<name>', [ ... ]).
    angular.bootstrap(document, [appModule.name], {
    });
});

