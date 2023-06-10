import path from 'path';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

import { Comment, Like, Post, User } from '../../types';
import { Datastore } from '../indexDao';

export class SqlDatastore implements Datastore {
	private db!: Database<sqlite3.Database, sqlite3.Statement>;
	public async openDb() {
		this.db = await open({
			filename: path.join(__dirname, 'codersquare.sqlite'),
			driver: sqlite3.Database,
		});

		this.db.run('PRAGMA foreign_keys = ON;');

		await this.db.migrate({
			migrationsPath: path.join(__dirname, 'migrations'),
		});

		return this;
	}

	async createUser(user: User): Promise<void> {
		await this.db.run(
			'INSERT INTO users (id, firstName, lastName, username, email, password) VALUES (?, ?, ?, ? , ?, ?)',
			user.id,
			user.firstName,
			user.lastName,
			user.username,
			user.email,
			user.password
		);
	}
	async getUserByEmail(email: string): Promise<User | undefined> {
		return await this.db.get<User>(
			`SELECT * FROM users WHERE email=?`,
			email
		);
	}
	async getUserByUsername(
		username: string
	): Promise<User | undefined> {
		return await this.db.get<User>(
			`SELECT * FROM users WHERE username=?`,
			username
		);
	}
	async listPosts(): Promise<Post[]> {
		return await this.db.all<Post[]>('SELECT * FROM posts');
	}

	async createPost(post: Post): Promise<void> {
		await this.db.run(
			'insert into posts (id, title, url, userId, postedAt) VALUES (?,?,?,?,?)',
			post.id,
			post.title,
			post.url,
			post.userId,
			post.postedAt
		);
	}
	async getPost(id: string): Promise<Post | undefined> {
		return await this.db.get<Post>(
			'SELECT * FROM posts WHERE id =?',
			id
		);
	}
	async deletePost(id: string): Promise<void> {
		await this.db.run('Delete FROM posts WHERE id =?', id);
	}
	async createLike(like: Like): Promise<void> {
		await this.db.run(
			'INSERT INTO likes (userId, postId) VALUES (?, ?)',
			like.userId,
			like.postId
		);
	}
	async listLikes(postId: string): Promise<Like[] | undefined> {
		return await this.db.all(
			'SELECT * FROM likes WHERE postId=?',
			postId
		);
	}
	async createComment(comment: Comment): Promise<void> {
		await this.db.run(
			'INSERT INTO comments (id, userId, postId, comment, postedAt) VALUES (?, ?, ?, ?, ?)',
			comment.id,
			comment.userId,
			comment.postId,
			comment.comment,
			comment.postedAt
		);
	}
	async listComment(postId: string): Promise<Comment[]> {
		return await this.db.all<Comment[]>(
			'SELECT * FROM comments WHERE postId=? ',
			postId
		);
	}
	async getCommentById(id: string): Promise<Comment | undefined> {
		return await this.db.get('SELECT * FROM comments WHERE id=?', id);
	}
	async deleteComment(id: string): Promise<void> {
		await this.db.run('DELETE FROM comments WHERE id =?', id);
	}
}
