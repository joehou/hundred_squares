const request = require('supertest')

describe("The User Api /api/users", () =>{
  describe("GET /api/users" , () => {
      test("returns a list of all users with firsrt user as Admin in JSON", async () => {
	const res = await request("http://localhost:3000")
          .get('/api/users/')
	  .expect(200)
	  .expect('Content-Type', /json/);
      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBeGreaterThan(0)
      expect(res.body[0].username).toBe('administrator') 
      })
    })
  describe("GET /api/users/:username", () => {
    test("returns the users profile and list of grids", async () =>{
      const res = await request('http://localhost:3000')
        .get('/api/users/JohnDough12/')
        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body.email).toBe('JohnDough12@test.com')
      // should have an array of grids
      expect(Array.isArray(res.body.grids)).toBe(true)
      // should have have at least one grid, if no grids one shuold be created
      expect(res.body.grids[0].length).toBeGreaterThan(0)
    })
  })
})
