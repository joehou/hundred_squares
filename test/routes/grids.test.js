const request = require('supertest')

let result=''
let secondResult = ''
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
  // Post /api/users/:user_id/grids/:grid_id/events/
  describe("post api/users/:id/grids/:grid_id/events/",() => {
    test("creates new event and returns the event", async () => {
      const newEvent= {"eventName":"test event","eventColor":"lightPink","eventFontColor":"Black","startBlock":8,"endBlock":15}
      const res = await request("http://localhost:3000")
        .post('/api/users/JohnDough20/grids/5c25552a6936d241c2f1bbba/events/')
        .send(newEvent)
        .expect(200)
        .expect('Content-Type',/json/)
      expect(res.body.eventName).toBe(newEvent.eventName)
      expect(res.body.eventColor).toBe(newEvent.eventColor)
      result=res.body._id
    },10000)
  })
  //updates event
  describe("put api/users/:id/grids/:grid_id/events/:event_id",() => {
    test("updates event and returns the updated event", async () => {
      const newEvent= {"eventName":"My first events update","eventColor":"lightBlue","eventFontColor":"Black","startBlock":0,"endBlock":7,"_id":"5c25552a6936d241c2f1bbbb"}
      const res = await request("http://localhost:3000")
        .put(`/api/users/JohnDough20/grids/5c25552a6936d241c2f1bbba/events/${result}`)
        .send(newEvent)
        .expect(200)
        .expect('Content-Type',/json/)
      expect(res.body.eventName).toBe('My first events update')
      expect(res.body.eventColor).toBe('lightBlue')

    },10000)
  })
  // it creates an element jnd deletes it
  describe("delete api/users/:id/grids/:grid_id/events/:events_id",()=>{
    test ("deletes a event", async () =>{
      const res = await request("http://localhost:3000")
      .delete(`/api/users/JohnDough20/grids/5c25552a6936d241c2f1bbba/events/${result}`)
      .send()
      .expect(200)
      expect(res.body._id).toBe(result)
    })
  })
  // it creates two new elements and deletes it
  describe("delete api/users/:id/grids/:grid_id/events/:events_id",()=>{
    test ("deletes an event and shifts squares after it down", async () =>{
      const newEvent= {"eventName":"test event","eventColor":"lightPink","eventFontColor":"Black","startBlock":8,"endBlock":15}
      const firstRes = await request("http://localhost:3000")
        .post('/api/users/JohnDough20/grids/5c25552a6936d241c2f1bbba/events/')
        .send(newEvent)
      result=firstRes.body._id

      const secondNewEvent= {"eventName":"test event","eventColor":"lightPink","eventFontColor":"Black","startBlock":16,"endBlock":18}
      const secondRes = await request("http://localhost:3000")
        .post('/api/users/JohnDough20/grids/5c25552a6936d241c2f1bbba/events/')
        .send(secondNewEvent)
      secondResult=secondRes.body._id

      const deleteRes = await request("http://localhost:3000")
      .delete(`/api/users/JohnDough20/grids/5c25552a6936d241c2f1bbba/events/${result}`)
      .send()
      .expect(200)

      const finalRes = await request('http://localhost:3000')
        .get('/api/users/JohnDough20/grids/5c25552a6936d241c2f1bbba')
        .expect(200)
        .expect('Content-Type', /json/)
      expect(finalRes.body.events[finalRes.body.events.length-1].startBlock).toBe(8)

      const lastDeleteRes = await request("http://localhost:3000")
      .delete(`/api/users/JohnDough20/grids/5c25552a6936d241c2f1bbba/events/${secondResult}`)
      .send()
      .expect(200)
    })
  })

})
