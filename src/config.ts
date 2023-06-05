import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export default {
	pepper: BCRYPT_PASSWORD,
	salt: SALT_ROUNDS,
};
