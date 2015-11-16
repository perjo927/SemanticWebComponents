/// <reference path="../../lib.d.ts" />

'use strict';

/*
    navbarDirective.ts
    Simple Navbar directive
*/

/* Imports */
const content = require('./navbar.json');
const html = require('./navbar.html');
const styles = require('./navbar.css');
//const styles = require('./_navbar.scss'); // TODO
//const styles = require('./_navbar.out.scss'); // dist (TODO)


/* Controller */
class NavCtrl {
    content: string;
    style: string;

    constructor() {
        this.content = content;
        this.style = styles;
    }
}

/* Directive */
export = () => {
    return {
        controller: NavCtrl,
        controllerAs: 'nav',
        template: html
    };
};