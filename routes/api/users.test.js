const request = require('supertest')

describe('The User Api /api/users', () =>{
    it('returns a list of all users', async () => {
      const res = await request('http://localhost:3000')
        .get('/api/users/list')
        .expect(200)
        .expect('Content-Type', /json/);
     // These expects are jest, not supertest
    // First, expect to get a result that is an array
    expect(Array.isArray(res.body)).toBe(true)
    // Second, expect the array to have something in it
    expect(res.body.length).toBeGreaterThan(0)
    // Third, expect the username of the first returned user to be Administrator
    expect(res.body[0].username).toBe('administrator') 

    })
})
