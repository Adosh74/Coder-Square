"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errHandler = void 0;
const errHandler = (err, req, res, next) => {
    console.log('Uncaught exception:', err);
    return res
        .status(500)
        .send('Oops, an unexpected error occurred please try again.');
};
exports.errHandler = errHandler;
