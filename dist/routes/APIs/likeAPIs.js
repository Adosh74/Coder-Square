"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeHandler_1 = require("../../handlers/likeHandler");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const routes = (0, express_1.default)();
routes
    .route('/:id')
    .post(auth_middleware_1.isAuthenticated, likeHandler_1.createLikeHandler)
    .get(likeHandler_1.listLikesHandler);
exports.default = routes;
