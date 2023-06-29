"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDatastore = void 0;
class InMemoryDatastore {
    constructor() {
        this.users = [];
        this.posts = [];
        this.comments = [];
        this.likes = [];
    }
    listLikes(postId) {
        throw new Error('Method not implemented.');
    }
    getCommentById(id) {
        throw new Error('Method not implemented.');
    }
    createUser(user) {
        this.users.push(user);
        return Promise.resolve();
    }
    getUserByEmail(email) {
        return Promise.resolve(this.users.find((user) => user.email === email));
    }
    getUserByUsername(username) {
        return Promise.resolve(this.users.find((user) => user.username === username));
    }
    listPosts() {
        return Promise.resolve(this.posts);
    }
    createPost(post) {
        this.posts.push(post);
        return Promise.resolve();
    }
    getPost(id) {
        return Promise.resolve(this.posts.find((post) => post.id === id));
    }
    deletePost(id) {
        const index = this.posts.findIndex((post) => post.id === id);
        if (index === -1) {
            return Promise.resolve();
        }
        this.posts.splice(index, 1);
        return Promise.resolve();
    }
    createLike(like) {
        this.likes.push(like);
        return Promise.resolve();
    }
    createComment(comment) {
        this.comments.push(comment);
        return Promise.resolve();
    }
    listComment(postId) {
        return Promise.resolve(this.comments.filter((comment) => comment.postId === postId));
    }
    deleteComment(id) {
        const index = this.comments.findIndex((comment) => comment.id === id);
        if (index === -1) {
            return Promise.resolve();
        }
        this.comments.splice(index, 1);
        return Promise.resolve();
    }
}
exports.InMemoryDatastore = InMemoryDatastore;
