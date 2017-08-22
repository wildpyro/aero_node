import { Request, Response } from 'express';

export default function index(req: Request, res: Response) {
	res.render('index', {
		user: req.body.user || null,
		request: req
	});
}
