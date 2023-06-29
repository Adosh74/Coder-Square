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
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const indexDao_1 = require("../datastore/indexDao");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).send('access denied');
        }
        const bearer = authorization && authorization.split(' ')[0];
        const token = authorization && authorization.split(' ')[1];
        if (bearer !== 'Bearer')
            return res.status(400).send('Invalid token');
        if (!token)
            return res.status(401).send('access denied');
        const decodedPayload = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
        if (!decodedPayload)
            return res.status(401).send('Invalid token');
        const user = yield indexDao_1.db.getUserByUsername(decodedPayload.username);
        if (!user)
            return res.status(401).json({
                message: 'user not found',
            });
        req.user = decodedPayload;
        next();
    }
    catch (error) {
        return res.status(401).send({ error: 'access denied' });
    }
});
exports.isAuthenticated = isAuthenticated;
