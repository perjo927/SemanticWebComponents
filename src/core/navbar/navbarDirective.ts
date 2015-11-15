/// <reference path="../../lib.d.ts" />

'use strict';

/*
    navbarDirective.ts
    Simple Navbar directive
*/


/* Imports */
const content = require('./navbar.json');
const html = require('./navbar.html'); // TODO: Make work
const styles = require('./navbar.css'); // CSS Modules style import
//import "./nav.scss";  // Sass style import

class NavCtrl {
    content: string;
    css: string;

    constructor() {
        this.content = content;
        this.css = styles;
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