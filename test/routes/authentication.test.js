const {assert} = require('chai')
const request = require('supertest')
const {jsdom}  = require('jsdom')
const { buildUserRegistration} = require('../test-utils.js')
const { connectDatabase, disconnectDatabase} = require('../setup-teardown-utils.js') 

const app = require('../../app')
const User = require('../../models/user')

describe("Server Path: /api/authentication/register", () => {
  beforeAll( () => { connectDatabase()})
  afterAll(  ()=>{ 
    mongoose.disconnect()
    app.close()
  })
  describe("POST", async() => {
    const newUser = buildUserRegistration()


   it("it creates a new user and returns 201", async() => { 
       const response = await request(app)
         .post('/api/authentication/register')
         .type('form')
         .send(newUser)
         .set('Accept', 'application/json')        

       const createdUser = await User.findOne({username:newUser.username})

       assert.isNotNull( createdUser, 'user was not found in DB') 
       assert.equal(response.statusCode,201)
       await User.find({username:newUser.username}).remove().exec()
    })

    it("it returns a 400 when user with no username is posted and does not createuser",async () =>{
       var badUser = Object.assign({},newUser) 
       badUser.username=null
        
       const response = await request(app)
         .post('/api/authentication/register')
         .type('form')
         .send(badUser)
         .set('Accept', 'application/json')        
      
      const createdUser = await User.findOne({email: 'test@test.com'}) 
      assert.isNull( createdUser, 'bad user was not supposed to be created')
   
   })
  })
})
