'use strict';

/*
    layout.ts
    Module for handling our layout directives.
*/

import navbarDirective = require('./navbar/navbarDirective');

export = angular.module('app.layout', [])
    .directive('navbar', navbarDirective);