module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://admin@localhost/availy',
  TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://admin@localhost/availy',

  /* API_TOKEN: process.env.API_TOKEN || 'false-api-token', */
}