const request = require('supertest')

describe("The grids api for users /api/users/:id/grids", () =>{
  describe("get api/users/:id/grids/recent", () => {
    test("returns last edited grid", async () => {
      const res = await request('http://localhost:3000')
        .get('/api/users/JohnDough20/grids/5c25552a6936d241c2f1bbba')
        .expect(200)
        .expect('Content-Type', /json/)
      expect(res.body.gridName).toBe('Dough Day')
    },10000)
  })
})
