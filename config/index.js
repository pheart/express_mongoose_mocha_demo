/**
 * 返回不同环境的配置文件
 *
 */

var env = process.env.NODE_ENV || 'dev';

module.exports = env === 'test' ? require('./test') :
				env === 'dev' ? require('./dev') :
				env === 'production' ? require('./production') : '';