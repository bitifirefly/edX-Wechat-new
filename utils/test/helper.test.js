const { expect } = require('chai');
const { getAccessToken } = require('../helper');

describe('edx token test', () => {
  it('getAccessToken', (done) => {
    getAccessToken('uniquexiaobai', 'edx411324')
      .then((token) => {
        expect(token).to.be.a('object');
        expect(token).to.include.keys('access_token', 'expires_in', 'refresh_token');
        done();
      });
  });
});
