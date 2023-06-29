"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postHandler_1 = require("../../handlers/postHandler");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const routes = (0, express_1.Router)();
routes
    .route('/')
    .get(auth_middleware_1.isAuthenticated, postHandler_1.listPostsHandler)
    .post(auth_middleware_1.isAuthenticated, postHandler_1.createPostHandler);
routes.route('/:id').delete(auth_middleware_1.isAuthenticated, postHandler_1.deletePostHandler);
exports.default = routes;
