const NODE_ENV = process.env.NODE_ENV;

const isProduction = NODE_ENV === 'production';
const isDevelopment = NODE_ENV === 'dev';

//not es6 modules to allow for electron usage
module.exports = ({
  isProduction,
  isDevelopment,
})
