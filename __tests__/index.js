const request = require('supertest')
const app = require('../app')

require('dotenv').config()

describe('Test the test JSON output', () => {
  test('It should return test content', (done) => {
    request(app)
      .get('/test.json')
      .then((response) => {
        expect(response.statusCode).toBe(200)

        done()
      })
  })

  test('It should return nothing on all clear', (done) => {
    request(app)
      .get('/emergency.json')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBeFalsy()
        done()
      })
  })

  test('It should save and return emergencies', (done) => {
    request(app)
      .post(`/update?key=${process.env.EMERGENCY_UPDATE_TOKEN}`)
      .send({
        title: 'This is a test',
      })
      .expect(200)
      .then((response) => {
        request(app)
          .get('/emergency.json')
          .then((response) => {
            expect(response.statusCode).toBe(200)

            expect(response.body.status).toBeTruthy()

            done()
          })
      })
  })
})
