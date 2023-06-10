import bcrypt from 'bcrypt';

import config from '../config';

const hashPassword = (password: string) => {
	const salt = parseInt(config.salt as unknown as string, 10);
	return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};

export default hashPassword;
