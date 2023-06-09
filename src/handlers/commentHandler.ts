import crypto from 'crypto';
import { RequestHandler } from 'express';

import { db } from '../datastore/indexDao';
import { Comment } from '../types';

export const createCommentHandler: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		// get comment from body
		const { comment } = req.body;
		const postId = req.params.id;
		if (!comment)
			return res.status(400).json({
				message: 'fill all required field',
			});

		const commentObj: Comment = {
			id: crypto.randomUUID(),
			userId: req.user.id,
			postId: postId,
			comment: comment,
			postedAt: Date.now(),
		};

		await db.createComment(commentObj);
		res.status(201).json({
			message: 'Comment created',
		});
	} catch (error) {
		next(error);
	}
};

export const listCommentsHandler: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		const postId = req.params.id;

		const comments: Comment[] = await db.listComment(postId);
		if (comments.length <= 0)
			return res.status(400).json({
				message: 'No comments',
			});

		res.status(200).json({
			comments: comments,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteCommentHandler: RequestHandler = async (
	req,
	res,
	next
) => {
	try {
		// get comment id
		const commentId = req.params.id;
		const comment = await db.getCommentById(commentId);
		if (req.user.id !== comment?.userId)
			return res.status(401).json({
				message: 'Can not delete comment',
			});
		await db.deleteComment(commentId);
		res.status(200).json({
			message: 'Comment deleted successfully',
		});
	} catch (error) {
		next(error);
	}
};
