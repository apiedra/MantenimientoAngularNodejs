module.exports = {
  user: process.env.API_ENDPOINT,

  // Instead of hard coding the password, consider prompting for it,
  // passing it in an environment variable via process.env, or using
  // External Authentication.
  password: process.env.API_ENDPOINT,

  // For information on connection strings see:
  // https://oracle.github.io/node-oracledb/doc/api.html#connectionstrings
  connectString: process.env.db_connection_string,
};