// eslint-disable-next-line no-undef
var crypto = require('crypto');

export const randomString = () => {
  return crypto.randomBytes(10).toString('hex');
};
