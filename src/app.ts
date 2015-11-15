'use strict';

// Finding .ts files named by an import x = require(...); declaration
// The files should be implementation files with top-level import or export declarations
import layout = require('./core/layout');

export = angular.module('app', [
    layout.name
]);