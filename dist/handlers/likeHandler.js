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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listLikesHandler = exports.createLikeHandler = void 0;
const indexDao_1 = require("../datastore/indexDao");
const createLikeHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const like = {
            userId: userId,
            postId: postId,
        };
        yield indexDao_1.db.createLike(like);
        res.sendStatus(201);
    }
    catch (error) {
        next(error);
    }
});
exports.createLikeHandler = createLikeHandler;
const listLikesHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get post id
        const postId = req.params.id;
        const likes = yield indexDao_1.db.listLikes(postId);
        res.status(200).json({ likes: likes });
    }
    catch (error) {
        next(error);
    }
});
exports.listLikesHandler = listLikesHandler;
