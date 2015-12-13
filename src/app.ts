
'use strict';

/*
 app.ts
 All sub-modules are imported here
 */

import layout = require('./core/layout');
import uiRouter = require('angular-ui-router');
import {StateConfig} from "./core/stateConfig";

export = angular.module('app', [
        uiRouter,
        layout.name
    ])
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', StateConfig.instance]);