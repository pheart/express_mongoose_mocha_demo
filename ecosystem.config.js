module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'demo',
      script    : 'bin/www',
      exec_mode : 'cluster',
      max_restarts: 10,
      error_file: "./logs/data/test-err.log",
      out_file: "./logs/data/test-out.log",
      pid_file: "./logs/data/test.pid",
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ]
};
