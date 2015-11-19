'use strict';

export class StateConfig {
    constructor() {}

    // @ngInject
    static config($stateProvider, $urlRouterProvider)  {
        $urlRouterProvider.otherwise("/state1");

        $stateProvider
            .state('state1', {
                url: "/state1",
                template: require("./partials/state1.html")
            })
            .state('state1.list', {
                url: "/list",
                template: require("./partials/state1.list.html"),
                controller: function ($scope) {
                    $scope.items = ["A", "List", "Of", "Items"];
                }
            })
            .state('state2', {
                url: "/state2",
                template: require("./partials/state2.html")
            })
            .state('state2.list', {
                url: "/list",
                template: require("./partials/state2.list.html"),
                controller: function ($scope) {
                    $scope.things = ["A", "Set", "Of", "Things"];
                }
            });
    }


}
