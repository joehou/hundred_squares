const puppeteer = require('puppeteer')
//const  {logInToPage} = require('../test-utils')

let page
let browser
const width = 1920
const height = 1080

var logInToPage = async (username,password) => {
      await page.goto("http://localhost:3000/account/login")
      await page.waitForSelector("#login-form")
      await page.click("input[name=userEmail]")
      await page.type("input[name=userEmail]", username)
      await page.click("input[name=userPassword]")
      await page.type("input[name=userPassword]", password)  
      await page.click("button[name=login]")
}


beforeAll(async () =>{
  browser = await puppeteer.launch({
    dumpio: true,
    headless: false,
    slowMo: 80,
    args: ['--no-sandbox','--disable-dev-shm-usage',`--window-size=${width},${height}`]
  },100000)
  page = await browser.newPage()
  await page.setViewport({ width, height})
})
afterAll(async()=>{
  await browser.close()
})

describe("user visits homepage", async() =>{
  //  it('will display a starter grid if user is not logged in' ,async () => {
  //    await  page.waitForNavigation({waitUntil: 'load'})
  //    await page.goto('http://localhost:3000/')
  //    const gridName  = await page.$eval('.gridName', el => el.innerText)
  //    expect(gridName).toBe('My Day')
  //  },10000)
  it('will go to dashboard to display a users more recently modified or default if it logged in', async () => {
    await page.goto("http://localhost:3000/account/login")
      await page.waitForSelector("#login-form")
      await page.click("input[name=userEmail]")
      await page.type("input[name=userEmail]", 'JohnDough20@test.com')
      await page.click("input[name=userPassword]")
      await page.type("input[name=userPassword]", 'Yarpyarp1')  
      await page.click("button[name=login]").catch(e => console.log(e))

    //await logInToPage("JohnDough20@test.com","Yarpyarp1")
    //await logInToPage("JohnDough20@test.com","Yarpyarp1")
      await page.waitForNavigation({waitUntil: 'load'}).catch(e => console.log(e))

    await page.waitForSelector("h1").catch(e => console.log(e))
      const gridName  = await page.$eval('.gridName', el => el.innerText)
      expect(gridName).toBe('Dough Day')
    //await page.waitForSelector('#grid')
  },10000)
},10000)
