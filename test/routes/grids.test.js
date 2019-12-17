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
  // /api/users/:user_id/grids/:grid_id/events/:event_id
  describe("post api/users/:id/grids/:grid_id/events/:event_id",() => {
    test("updates event and returns the updated event", async () => {
      const newEvent= {"eventName":"My first events update","eventColor":"lightBlue","eventFontColor":"Black","startBlock":0,"endBlock":7,"_id":"5c25552a6936d241c2f1bbbb"}
      const res = await request("http://localhost:3000")
        .put('/api/users/JohnDough20/grids/5c25552a6936d241c2f1bbba/events/5c25552a6936d241c2f1bbbb')
        .send(newEvent)
        .expect(200)
        .expect('Content-Type',/json/)
      expect(res.body.eventName).toBe('My first events update')
      expect(res.body.eventColor).toBe('lightBlue')

    },10000)
  })
})
