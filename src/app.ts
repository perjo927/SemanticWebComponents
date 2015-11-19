
'use strict';

/*
 app.ts
 Bootstraps Angular, rather than adding ng-app="app" into the html.
 All sub-modules are imported here
 */

import layout = require('./core/layout');
import uiRouter = require('angular-ui-router');
import {StateConfig} from "./core/states";

export = angular.module('app', [
        uiRouter,
        layout.name
    ])
    .config(StateConfig.config);