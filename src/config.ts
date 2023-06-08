import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;

export default {
	pepper: BCRYPT_PASSWORD,
	salt: SALT_ROUNDS,
	tokenSecret: TOKEN_SECRET,
};
