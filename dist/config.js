"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
exports.default = {
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokenSecret: TOKEN_SECRET,
};
