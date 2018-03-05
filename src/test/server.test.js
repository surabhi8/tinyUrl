const server = require('../../src/solution/server');
const model = require('../../models');

describe('Testing the Hapi server that processes the get request of short url given long url', () => {
  test('Should return short url correspoing to long url', (done) => {
    const longurl= { longurl: 'http//google.com/10000' };
    const options = {
      method: 'GET',
      url: '',
      payload: { longurl: 'http//google.com/10000' },
    };
    server.inject(options, (response) => {
      Model.urls.findAll({where:})
      expect(response.result.status_code).toBe(200);
      done();
    });
  });
  test('Should return correct response for successful get request for books with ratings', (done) => {
    const options = {
      method: 'GET',
      url: '/Books/BooksWithRatings',
    };
    server.inject(options, (response) => {
      expect(response.result.data).toEqual(JSONResponseFromAPI1);
      done();
    });
  });
  test('Should return correct response for successful post request for database transaction', (done) => {
    const options = {
      method: 'POST',
      url: '/Books/BookDetails',
    };
    server.inject(options, (response) => {
      expect(response.result.message).toEqual('Data Inserted');
      done();
    });
  });
  test('Should return correct status code for successful post request for database transaction', (done) => {
    const options = {
      method: 'POST',
      url: '/Books/BookDetails',
    };
    server.inject(options, (response) => {
      expect(response.result.status_code).toBe(201);
      done();
    });
  });
  test('Should return correct message for successful post request for liking the book', (done) => {
    const options = {
      method: 'GET',
      url: '/Books/Like/7',
    };
    server.inject(options, (response) => {
      expect(response.result.message).toBe('Liked');
      done();
    });
  });
  test('Should return correct message for successful post request for unliking the book', (done) => {
    const options = {
      method: 'GET',
      url: '/Books/Unlike/7',
    };
    server.inject(options, (response) => {
      expect(response.result.message).toBe('Unliked');
      done();
    });
  });
});
