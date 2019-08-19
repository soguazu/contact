const debub = require('debug');

const log = debub('http:config');

const environments = {};

// Staging (default) environment
environments.development = {
  envName: 'development',
  hashingSecret: process.env.MY_SECRET,
};

// Production environment
environments.production = {
  envName: 'production',
  hashingSecret: process.env.MY_SECRET,
};

environments.test = {
  envName: 'test',
  hashingSecret: process.env.MY_SECRET,
};

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof process.env.NODE_ENV === 'string'
  ? process.env.NODE_ENV.toLowerCase()
  : '';
  // Check that the current environment is one of the environments above, if not default to staging
const environmentToExport = typeof environments[currentEnvironment] === 'object'
  ? environments[currentEnvironment]
  : environments.staging;
// Export the module
module.exports = environmentToExport;
