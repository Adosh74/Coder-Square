"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authHandler_1 = require("../../handlers/authHandler");
const routes = (0, express_1.default)();
routes.post('/signup', authHandler_1.signupHandler);
routes.post('/signin', authHandler_1.signInHandler);
exports.default = routes;
