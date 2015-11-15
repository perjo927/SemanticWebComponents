/*  lib.t.s */
/*  Making require style imports available for other resources than .ts with Webpack */

// https://github.com/Microsoft/TypeScript/issues/2709
// https://github.com/TypeStrong/ts-loader#loading-other-resources-and-code-splitting
// https://medium.com/@bestander_nz/fighting-typescript-for-webpack-c5127b55ec86
declare function require(string): any;
