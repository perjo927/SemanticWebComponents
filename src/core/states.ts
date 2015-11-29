const state1: string = require("./partials/sass.html"),
    state1List: string = require("./partials/sass.list.html"),
    state2: string = require("./partials/cssModules.html"),
    state2List: string = require("./partials/cssModules.list.html"),
    state404  = require("./404.html"),
    stateDefault = require("./index.html");

const links = require("./data/externalLinks.json");


const states = [
  {
    state: 'default',
    config: {
      url: '/',
      template: stateDefault,
      title: 'Default'
    }
  },
  {
    state: '404',
    config: {
      url: '/404',
      template: state404,
      title: '404'
    }
  },
  {
    state: 'state1',
    config: {
      url: "/state1",
      template: state1
    }
  },
  {
    state: 'state1.list',
    config: {
      url: "/list",
      template: state1List,
      controller: function ($scope) {
        $scope.links = links.links
      }
    },
  },
  {
    state: 'state2',
    config: {
      url: "/state2",
      template: state2
    },
  },
  {
    state: 'state2.list',
    config: {
      url: "/list",
      template: state2List,
      controller: function ($scope) {
        $scope.links = links.links
      }
    }
  },
];

export {states};