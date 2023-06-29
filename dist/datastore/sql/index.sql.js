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
exports.SqlDatastore = void 0;
const path_1 = __importDefault(require("path"));
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
class SqlDatastore {
    openDb() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield (0, sqlite_1.open)({
                filename: path_1.default.join(__dirname, 'codersquare.sqlite'),
                driver: sqlite3_1.default.Database,
            });
            this.db.run('PRAGMA foreign_keys = ON;');
            yield this.db.migrate({
                migrationsPath: path_1.default.join(__dirname, 'migrations'),
            });
            return this;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('INSERT INTO users (id, firstName, lastName, username, email, password) VALUES (?, ?, ?, ? , ?, ?)', user.id, user.firstName, user.lastName, user.username, user.email, user.password);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get(`SELECT * FROM users WHERE email=?`, email);
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get(`SELECT * FROM users WHERE username=?`, username);
        });
    }
    listPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.all('SELECT username, title, url, postedAt FROM posts INNER JOIN users ON posts.userId = users.id');
        });
    }
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('insert into posts (id, title, url, userId, postedAt) VALUES (?,?,?,?,?)', post.id, post.title, post.url, post.userId, post.postedAt);
        });
    }
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get('SELECT * FROM posts WHERE id =?', id);
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('Delete FROM posts WHERE id =?', id);
        });
    }
    createLike(like) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('INSERT INTO likes (userId, postId) VALUES (?, ?)', like.userId, like.postId);
        });
    }
    listLikes(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.all('SELECT username FROM users INNER JOIN likes ON users.id = likes.userId WHERE postId=?', postId);
        });
    }
    createComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('INSERT INTO comments (id, userId, postId, comment, postedAt) VALUES (?, ?, ?, ?, ?)', comment.id, comment.userId, comment.postId, comment.comment, comment.postedAt);
        });
    }
    listComment(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.all('SELECT username, comment, postedAt FROM comments INNER JOIN users ON comments.userId = users.id WHERE postId=? ', postId);
        });
    }
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get('SELECT * FROM comments WHERE id=?', id);
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('DELETE FROM comments WHERE id =?', id);
        });
    }
}
exports.SqlDatastore = SqlDatastore;
