'use strict';

import "./nav.scss";  // load styles for the component
//import navHtml = require('nav.html'); // TODO: Make work
//import appJson = require('../../index.json'); // TODO: Make work

class NavCtrl {
    app: any;
    constructor() {
        //this.app = appJson;
        this.app = {
            title: 'Module Loaders',
            version: '0.3.0',
            links: [{
                text: 'Webpack',
                link: 'http://webpack.github.io'
            }, {
                text: 'Require.js',
                link: 'http://requirejs.org/'
            }, {
                text: 'Jspm',
                link: 'http://jspm.io/'
            }]
        };
    }
}
// Directive
export = () => {
    return {
        controller: NavCtrl,
        controllerAs: 'nav',
        //templateUrl: './nav.html'
        // navHtml
        template: `<header class="header" ng-cloak>
                        <!-- Get the app info and put it in the navbar on the left -->
                        <h1 class="main-logo">
                            <a href="/" class="main-logo__link" lx-ripple="white">
                                <span class="main-nav--title">{{::nav.app.title}} </span>
                                <span class="main-nav--version">v{{::nav.app.version}}</span>
                            </a>
                        </h1>
                        <!-- Loop over the links and add them to the navbar on the right -->
                        <nav class="main-nav main-nav--lap-and-up">
                            <ul>
                                <li ng-repeat="n in nav.app.links">
                                    <a href="{{::n.link}}" class="main-nav__link" lx-ripple="white">
                                        {{::n.text}}</a>
                                </li>
                            </ul>
                        </nav>
                    </header>`
    };
};