import { RequestHandler } from 'express';

import { db } from '../datastore/indexDao';
import { Like } from '../types';

export const createLikeHandler: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const postId = req.params.id;
		const userId = req.user.id;

		const like: Like = {
			userId: userId,
			postId: postId,
		};
		await db.createLike(like);
		res.sendStatus(201);
	} catch (error) {
		next(error);
	}
};

export const listLikesHandler: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		// get post id
		const postId = req.params.id;

		const likes = await db.listLikes(postId);
		res.status(200).json({ likes: likes });
	} catch (error) {
		next(error);
	}
};
