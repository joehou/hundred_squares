const request = require('supertest')

describe("The User Api /api/users", () =>{
  describe("post" , () => {
      it("returns a list of all users with firsrt user as Admin in JSON", async () => {
	const res = await request("http://localhost:3000")
	  .get('/api/users/list')
	  .expect(200)
	  .expect('Content-Type', /json/);
      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBeGreaterThan(0)
      expect(res.body[0].username).toBe('administrator') 
      })
    })
})
