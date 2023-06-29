"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostHandler = exports.createPostHandler = exports.listPostsHandler = void 0;
const crypto_1 = __importDefault(require("crypto"));
const indexDao_1 = require("../datastore/indexDao");
//** +[1] get all posts **/
const listPostsHandler = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send({ post: yield indexDao_1.db.listPosts() });
    }
    catch (error) {
        next(error);
    }
});
exports.listPostsHandler = listPostsHandler;
//** +[3] create post **/
const createPostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title || !req.body.url) {
        return res.sendStatus(400);
    }
    const post = {
        id: crypto_1.default.randomUUID(),
        title: req.body.title,
        url: req.body.url,
        userId: req.user.id,
        postedAt: Date.now(),
    };
    try {
        yield indexDao_1.db.createPost(post);
        res.sendStatus(201);
    }
    catch (error) {
        next(error);
    }
});
exports.createPostHandler = createPostHandler;
//** +[3] delete post **/
const deletePostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get post id from parameters
        const postId = req.params.id;
        const post = yield indexDao_1.db.getPost(postId);
        if (!post)
            return res.status(400).json({
                message: 'no post found',
            });
        if (post.userId !== req.user.id)
            return res.status(401).json({
                message: 'unauthorized to delete post',
            });
        yield indexDao_1.db.deletePost(postId);
        res.status(200).json({
            message: 'post deleted successfully',
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deletePostHandler = deletePostHandler;
