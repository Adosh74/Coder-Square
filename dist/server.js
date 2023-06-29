'use strict';
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step(
				(generator = generator.apply(
					thisArg,
					_arguments || []
				)).next()
			);
		});
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const express_async_handler_1 = __importDefault(
	require('express-async-handler')
);
const indexDao_1 = require('./datastore/indexDao');
const errHandler_middleware_1 = require('./middleware/errHandler.middleware');
const logger_middleware_1 = require('./middleware/logger.middleware');
const indexRoute_1 = __importDefault(require('./routes/indexRoute'));
(() =>
	__awaiter(void 0, void 0, void 0, function* () {
		yield (0, indexDao_1.initDb)();
		const app = (0, express_1.default)();
		app.use(express_1.default.json());
		app.use(express_1.default.urlencoded({ extended: true }));
		app.use(logger_middleware_1.requestLoggerMiddleware);
		app.use(
			'/v1',
			(0, express_async_handler_1.default)(indexRoute_1.default)
		);
		app.use(errHandler_middleware_1.errHandler);
		app.listen(process.env.PORT || 3001);
	}))();
