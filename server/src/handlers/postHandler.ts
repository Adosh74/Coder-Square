import crypto from 'crypto';
import { RequestHandler } from 'express';

import { db } from '../datastore/indexDao';
import { Indexed } from '../middleware/custom';
import { Post } from '../types';

//** +[1] get all posts **/
export const listPostsHandler: RequestHandler = async (
	_req,
	res,
	next
) => {
	try {
		res.send({ post: await db.listPosts() });
	} catch (error) {
		next(error);
	}
};

//** +[3] create post **/
export const createPostHandler: RequestHandler = async (
	req: Indexed,
	res,
	next
) => {
	if (!req.body.title || !req.body.url) {
		return res.sendStatus(400);
	}

	const post: Post = {
		id: crypto.randomUUID(),
		title: req.body.title,
		url: req.body.url,
		userId: req.user.id,
		postedAt: Date.now(),
	};
	try {
		await db.createPost(post);
		res.sendStatus(201);
	} catch (error) {
		next(error);
	}
};

//** +[3] delete post **/
export const deletePostHandler: RequestHandler = async (
	req: Indexed,
	res,
	next
) => {
	try {
		// get post id from parameters
		const postId = req.params.id;

		const post = await db.getPost(postId as unknown as string);

		if (!post)
			return res.status(400).json({
				message: 'no post found',
			});

		if (post.userId !== req.user.id)
			return res.status(401).json({
				message: 'unauthorized to delete post',
			});

		await db.deletePost(postId as unknown as string);
		res.status(200).json({
			message: 'post deleted successfully',
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};
