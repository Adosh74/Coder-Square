import crypto from 'crypto';
import { RequestHandler } from 'express';

import { db } from '../datastore/indexDao';
import { Post } from '../types';

export const listPostsHandler: RequestHandler = async (req, res) => {
	res.send({ post: await db.listPosts() });
};

export const createPostHandler: RequestHandler = async (
	req,
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
		userId: req.body.userId,
		postedAt: Date.now(),
	};
	try {
		await db.createPost(post);
		res.sendStatus(201);
	} catch (error) {
		next(error);
	}
};
