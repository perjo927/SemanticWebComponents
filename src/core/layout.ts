import nav = require('./nav/nav');

export = angular.module('app.layout', [])
    .directive('navbar', nav);