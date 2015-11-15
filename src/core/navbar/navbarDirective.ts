/// <reference path="../../lib.d.ts" />

'use strict';

/*
    navbarDirective.ts
    Simple Navbar directive
*/


/* Imports */
const content = require('./navbar.json');
const html = require('./navbar.html');
const styles = require('./nav.scss');
//const styles = require('./navbar.css');
//const styles = require('./navbar.out.css'); // for dist purposes

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