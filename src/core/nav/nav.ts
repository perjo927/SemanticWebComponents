/// <reference path="../../lib.d.ts" />
'use strict';

/* Imports */
let content = require('./nav.json');
let html = require('./nav.html'); // TODO: Make work
let styles = require('./test.css'); // CSS Modules style import
//import "./nav.scss";  // Sass style import

class NavCtrl {
    content: any;
    styles: any;

    constructor() {
        this.content = content;
        this.styles = styles;
    }
}

// Directive
export = () => {
    return {
        controller: NavCtrl,
        controllerAs: 'nav',
        template: html
    };
};