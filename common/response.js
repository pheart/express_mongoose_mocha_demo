const Codes = require('../errors/code');

exports.responseJson = (res, data = '') => {
	res.json({
		code: Codes.SUCCESS_CODE,
		data
	})
}