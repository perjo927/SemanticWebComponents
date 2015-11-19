'use strict';

/*
    vendor.ts
    Loads vendor dependencies and global styles
*/

/* JS */
// Module load Angular
// Replaces adding <script src="bower_components/angular/angular.min.js">.
import angular = require("angular");
//import angularUiRouter = require('angular-ui-router'); // TODO
//import {uiRouter} from "angular-ui-router"; // TODO



/* App-level styles */
// import "../_app.scss"; /* Global style import */
//const appStyles =  require("../_app.scss"); // todo
const appStyles =  require("../app.css");

/* Exports */
export = { angular }//, uiRouter }
