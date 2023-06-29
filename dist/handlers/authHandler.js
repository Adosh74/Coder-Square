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
exports.signInHandler = exports.signupHandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const indexDao_1 = require("../datastore/indexDao");
const hashPassword_1 = __importDefault(require("../utilities/hashPassword"));
const signupHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).send('fill all required fields');
        }
        const existing = (yield indexDao_1.db.getUserByEmail(email)) ||
            (yield indexDao_1.db.getUserByUsername(username));
        if (existing) {
            return res.status(400).send('User already exists');
        }
        const user = {
            id: crypto_1.default.randomUUID(),
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: (0, hashPassword_1.default)(password),
        };
        yield indexDao_1.db.createUser(user);
        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
});
exports.signupHandler = signupHandler;
const signInHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        const user = (yield indexDao_1.db.getUserByEmail(login)) ||
            (yield indexDao_1.db.getUserByUsername(login));
        const validPassword = yield bcrypt_1.default.compare(`${password}${config_1.default.pepper}`, user === null || user === void 0 ? void 0 : user.password);
        if (!user || !validPassword) {
            return res.status(401).send('wrong information');
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
        }, config_1.default.tokenSecret);
        res.status(200).json({
            message: 'user login successful',
            token: token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signInHandler = signInHandler;
