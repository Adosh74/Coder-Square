import { CommentDao } from './DAOs/commentDao';
import { LikeDao } from './DAOs/likeDao';
import { PostDao } from './DAOs/postDao';
import { UserDao } from './DAOs/userDao';
import { SqlDatastore } from './sql/index.sql';

// import { InMemoryDatastore } from './memorydb';

export interface Datastore
	extends UserDao,
		PostDao,
		LikeDao,
		CommentDao {}

export let db: Datastore;

export async function initDb() {
	// db = new InMemoryDatastore();
	db = await new SqlDatastore().openDb();
}
