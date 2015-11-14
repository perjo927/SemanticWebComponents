'use strict';

import "./nav.scss";  // load styles for the component
//import navHtml = require('nav.html'); // TODO: Make work
//import appJson = require('../../index.json'); // TODO: Make work

class NavCtrl {
    app: any;
    constructor() {
        //this.app = appJson;
        this.app = {
            title: 'Semantic Web Components',
            version: '0.0.1',
            links: [{
                text: 'Webpack',
                link: 'http://webpack.github.io'
            },
            {
                text: 'Angular.js',
                link: 'https://angularjs.org/'
            },
            {
                text: 'TypeScript',
                link: 'http://www.typescriptlang.org/'
            },
                {
                text: 'CSS Modules',
                link: 'https://github.com/css-modules/css-modules'
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
        template:
            `<!-- Get the app info and put it in the navbar on the left -->
            <h1>
                <a href="/" >
                    <span class="title">{{::nav.app.title}} </span>
                    <span class="version">v{{::nav.app.version}}</span>
                </a>
            </h1>
            <!-- Loop over the links and add them to the navbar on the right -->
            <nav>
                <ul>
                    <li ng-repeat="n in nav.app.links">
                        <a href="{{::n.link}}" target="_blank">
                            {{::n.text}}
                        </a>
                    </li>
                </ul>
            </nav>`
    };
};