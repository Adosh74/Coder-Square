"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authAPIs_1 = __importDefault(require("./APIs/authAPIs"));
const commentAPIs_1 = __importDefault(require("./APIs/commentAPIs"));
const likeAPIs_1 = __importDefault(require("./APIs/likeAPIs"));
const postsAPIs_1 = __importDefault(require("./APIs/postsAPIs"));
const routes = (0, express_1.Router)();
routes.use(authAPIs_1.default);
routes.use('/posts', postsAPIs_1.default);
routes.use('/comments', commentAPIs_1.default);
routes.use('/likes', likeAPIs_1.default);
exports.default = routes;
