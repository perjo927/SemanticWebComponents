const links = require("./data/externalLinks.json"); // TODO: separe jsons for each state
const styles = require('./states.css');

/* Controller */
class StateCtrl {
  links: {};
  style: string;

  constructor() {
    this.links = links.links;
    this.style = styles;
  }
}

const states = [
  {
    state: 'default',
    config: {
      url: '/',
      template: require("./index.html"),
      title: 'Default'
    }
  },
  {
    state: '404',
    config: {
      url: '/404',
      template: require("./404.html"),
      title: '404'
    }
  },
  {
    state: 'sass',
    config: {
      url: "/sass",
      template: require("./partials/sass.html"),
      controller: StateCtrl,
      controllerAs: "ctrl"
    }
  },
  {
    state: 'sass.resources',
    config: {
      url: "/resources",
      template: require("./partials/sass.list.html"),
      controller: StateCtrl,
      controllerAs: "ctrl"
    },
  },
  {
    state: 'cssModules',
    config: {
      url: "/css-modules",
      template: require("./partials/cssModules.html"),
      controller: StateCtrl,
      controllerAs: "ctrl"
    },
  },
  {
    state: 'cssModules.resources',
    config: {
      url: "/resources",
      template: require("./partials/cssModules.list.html"),
      controller: StateCtrl,
      controllerAs: "ctrl"
    }
  },
];

export {states};