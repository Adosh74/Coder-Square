"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLoggerMiddleware = void 0;
const requestLoggerMiddleware = (req, _res, next) => {
    console.log(`${req.method} ${req.path}-body:${JSON.stringify(req.body)}`);
    next();
};
exports.requestLoggerMiddleware = requestLoggerMiddleware;
