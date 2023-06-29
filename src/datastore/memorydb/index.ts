import { Comment, Like, Post, User } from '../../types';
import { Datastore } from '../indexDao';

export class InMemoryDatastore implements Datastore {
	listLikes(postId: string): Promise<Like[] | undefined> {
		throw new Error('Method not implemented.');
	}
	getCommentById(id: string): Promise<Comment | undefined> {
		throw new Error('Method not implemented.');
	}
	private users: User[] = [];
	private posts: Post[] = [];
	private comments: Comment[] = [];
	private likes: Like[] = [];

	createUser(user: User): Promise<void> {
		this.users.push(user);
		return Promise.resolve();
	}
	getUserByEmail(email: string): Promise<User | undefined> {
		return Promise.resolve(
			this.users.find((user) => user.email === email)
		);
	}
	getUserByUsername(username: string): Promise<User | undefined> {
		return Promise.resolve(
			this.users.find((user) => user.username === username)
		);
	}
	listPosts(): Promise<Post[]> {
		return Promise.resolve(this.posts);
	}
	createPost(post: Post): Promise<void> {
		this.posts.push(post);
		return Promise.resolve();
	}
	getPost(id: string): Promise<Post | undefined> {
		return Promise.resolve(this.posts.find((post) => post.id === id));
	}
	deletePost(id: string): Promise<void> {
		const index = this.posts.findIndex((post) => post.id === id);
		if (index === -1) {
			return Promise.resolve();
		}
		this.posts.splice(index, 1);
		return Promise.resolve();
	}
	createLike(like: Like): Promise<void> {
		this.likes.push(like);
		return Promise.resolve();
	}
	createComment(comment: Comment): Promise<void> {
		this.comments.push(comment);
		return Promise.resolve();
	}
	listComment(postId: string): Promise<Comment[]> {
		return Promise.resolve(
			this.comments.filter((comment) => comment.postId === postId)
		);
	}
	deleteComment(id: string): Promise<void> {
		const index = this.comments.findIndex(
			(comment) => comment.id === id
		);
		if (index === -1) {
			return Promise.resolve();
		}
		this.comments.splice(index, 1);
		return Promise.resolve();
	}
}
