declare global {
	namespace Express {
		interface Request {
			user: any;
		}
	}
}
export type Indexed = {
	[key: string]: any;
};
