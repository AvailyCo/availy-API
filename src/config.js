module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://admin@localhost/availy',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://admin@localhost/availy',

  /* API_TOKEN: process.env.API_TOKEN || 'false-api-token', */
}