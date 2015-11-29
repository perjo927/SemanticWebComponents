Semantic Web Components
=======================
###### *by Per Jonsson*

Introduction
------------
We try to accomplish **ONE** Front-end Using Modular CSS & HTML.
We do this by showing you our conclusions in **living documentation**.

This app is built on Angular, TypeScript, CSS Modules and Webpack. 

Installation
------------

### Requirements 
* [Node.js](https://nodejs.org/en/)
* [Webpack](http://webpack.github.io/)
 
### Get started 
1. Install dependencies
    ```
    > npm install
    ```

2. Build 
    * development mode: `> npm run dev-build`
    * production mode: `> npm run dist-build`

3. Run!        
    ```
    > npm start
    ```
    
4. Browse
    * Normal mode
        - [**localhost:8080/**](http://localhost:8080/)
    * Dev mode
        - [**localhost:8080/webpack-dev-server/**](http://localhost:8080/webpack-dev-server/) 

Develop
-------
Get the *typescript*, *tsd*, *node-sass* and *webpack-dev-server* packages from **npm**
in order to compile and handle dependencies.

Specify browsers to target in the _browserslist_ config file using [Browserslist](https://github.com/ai/browserslist).

There is a bug using hot code reload with webpack-dev-server, it doesn't generate index.html from template.html
when browsing to http://localhost:8080/webpack-dev-server/ . Either place a copy manually in ./src or
go to http://localhost:8080/public/index.html without live reload.

<!-- TODO: npm deploy -->

Demo
----
[Live demo (TBA)](http://perjo927.github.io/SemanticWebComponents/)


Contact
-------
[Programmer Per](http://www.ProgrammerPer.com)


Documentation
-------------
Read the (TBA) [**docs**](http://perjo927.github.io/SemanticWebComponents).

## Changelog
v0.0.2