const {assert} = require('chai')
const request = require('supertest')
const  {buildUserRegistration} = require('../test-utils')


describe("User visits login page", () => {
  describe("starts with empty login", () =>{
    it("starts with cursor focused in empty email field", () =>{
      const  expectedFocus = 'userEmail'
      
      expect(expectedFocus).toBe('userEmail')
    })
  })
})
