'use strict';

import greeter = require('./greeter');
import layout = require('./core/layout');

function printMessage (status=greeter(" App!")) {
    console.info(status);
}
printMessage();

export = angular.module('app', [
    layout.name
]);