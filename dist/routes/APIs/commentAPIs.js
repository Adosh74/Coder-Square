"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentHandler_1 = require("../../handlers/commentHandler");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const routes = (0, express_1.default)();
routes
    .route('/:id')
    .post(auth_middleware_1.isAuthenticated, commentHandler_1.createCommentHandler)
    .get(commentHandler_1.listCommentsHandler)
    .delete(auth_middleware_1.isAuthenticated, commentHandler_1.deleteCommentHandler);
exports.default = routes;
