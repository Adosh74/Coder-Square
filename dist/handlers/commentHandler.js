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
exports.deleteCommentHandler = exports.listCommentsHandler = exports.createCommentHandler = void 0;
const crypto_1 = __importDefault(require("crypto"));
const indexDao_1 = require("../datastore/indexDao");
const createCommentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get comment from body
        const { comment } = req.body;
        const postId = req.params.id;
        if (!comment)
            return res.status(400).json({
                message: 'fill all required field',
            });
        const commentObj = {
            id: crypto_1.default.randomUUID(),
            userId: req.user.id,
            postId: postId,
            comment: comment,
            postedAt: Date.now(),
        };
        yield indexDao_1.db.createComment(commentObj);
        res.status(201).json({
            message: 'Comment created',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createCommentHandler = createCommentHandler;
const listCommentsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const comments = yield indexDao_1.db.listComment(postId);
        if (comments.length <= 0)
            return res.status(400).json({
                message: 'No comments',
            });
        res.status(200).json({
            comments: comments,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.listCommentsHandler = listCommentsHandler;
const deleteCommentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get comment id
        const commentId = req.params.id;
        const comment = yield indexDao_1.db.getCommentById(commentId);
        if (req.user.id !== (comment === null || comment === void 0 ? void 0 : comment.userId))
            return res.status(401).json({
                message: 'Can not delete comment',
            });
        yield indexDao_1.db.deleteComment(commentId);
        res.status(200).json({
            message: 'Comment deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCommentHandler = deleteCommentHandler;
