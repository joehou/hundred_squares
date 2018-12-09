const puppeteer =require("puppeteer")
const  {buildUserRegistration} = require('../test-utils')

let page
let browser
const width = 1920 
const height = 1080

beforeAll(async () => {
    browser = await puppeteer.launch({
          headless: false,
          slowMo: 80, 
          args: [`--window-size=${width},${height}`]
        },100000);
    page = await browser.newPage();
    await page.setViewport({ width, height });
});
afterAll(() => {
    browser.close();
});

describe("User visits login page", () => {
  describe("renders login page", () => {

     it("will display login in link in header before loging in that takes you to login page", async () =>{
      await page.goto("http://localhost:3000/")
      await page.waitForSelector("#table")
      await page.click("#login-link")
      await page.waitForSelector("#login-form")
      expect (page.url()).toBe("http://localhost:3000/account/login")
    }),

    it("can enter credentials and displays welcome message in header after login", async () =>{
      await page.goto("http://localhost:3000/account/login")
      await page.waitForSelector("#login-form")
      await page.click("input[name=userEmail]")
      await page.type("input[name=userEmail]", "tyranthou@gmail.com")
      await page.click("input[name=userPassword]")
      await page.type("input[name=userPassword]", "Yarpyarp1") 
      await page.click("button[name=login]")
      await page.waitForNavigation({waitUntil: 'load'})
      const text = await page.$eval('h1', el => el.innerText)
      expect(text).toBe("Square")
      const firstName = await page.$eval('.welcome', el=>el.innerText)
      expect(firstName.toLowerCase()).toContain('christopher')
    },100000),

    it("will stay on same page and show error if incorrect login is entered", async () => {
      await page.goto("http://localhost:3000/account/login")
      await page.waitForSelector("#login-form")
      await page.click("input[name=userEmail]")
      await page.type("input[name=userEmail]","tyranthou@gmail.com")
      await page.click("input[name=userPassword]")
      await page.type("input[name=userPassword]","BADPASSWORDBAD")
      await page.click("button[name=login]")
      await page.waitForSelector('strong')
      const text = await page.$eval('strong', el => el.innerText)
      expect (text).toContain("Error")
    },100000)
           
  })
})
