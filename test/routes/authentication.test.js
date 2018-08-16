const {assert} = require('chai')
const request = require('supertest')
const {jsdom}  = require('jsdom')
const { buildUserRegistration} = require('../test-utils.js')
const { connectDatabase, disconnectDatabase} = require('../setup-teardown-utils.js') 

const app = require('../../app')
const User = require('../../models/user')

describe('Server Path: /api/authentication/register', () => {
  beforeEach(connectDatabase)
  afterEach(disconnectDatabase)

  describe('POST', () => {
    it('it creates a new user', async() => { 
       const newUser = buildUserRegistration()
       const response = await request(app)
         .post('/api/authentication/register')
         .type('form')
         .send(newUser)
         .set('Accept', 'application/json')        

       const createdUser = await User.findOne({username:newUser.username})

       assert.isNotNull( createdUser, 'user was not found in DB') 
       User.deleteOne({username:newUser.username})

       //assert.equal(response.text,'ok')
       //assert.equal(response.statusCode,201)
    })
  })
})
