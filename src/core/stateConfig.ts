'use strict';

export class StateConfig {

    constructor(private $stateProvider: ng.ui.IStateProvider,
                private $locationProvider: ng.ILocationProvider,
                private $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    }

    static instance ($stateProvider,  $locationProvider, $urlRouterProvider) {
        var states = require('./states');
        states.states.forEach(function(state) {
            $stateProvider.state(state.state, state.config);
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise("404");
    }
}
