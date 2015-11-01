/*jshint browser:true */
'use strict';

/*
    bootstrap.ts
    Bootstraps Angular, rather than adding ng-app="app" into the html.
*/

// Load all vendor dependencies
import "./vendor";

// Load the main app file (src/app.ts)
import appModule = require('../app');

// Replaces ng-app="appName"
angular.element(document).ready(function () {
    // appModule.name will be taken from app.ts, for instance "app": angular.module('<name>', [ ... ]).
    angular.bootstrap(document, [appModule.name], {
        //strictDi: true
    });
});

