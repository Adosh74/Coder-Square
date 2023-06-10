import { Like } from '../../types';

export interface LikeDao {
	createLike(like: Like): Promise<void>;
	listLikes(postId: string): Promise<Like[] | undefined>;
}
