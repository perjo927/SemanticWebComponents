'use strict';

import greeter = require("./greeter");

function printMessage (status=greeter(" World!")) {
    console.log(status);
}
printMessage();

export = angular.module('app', []);