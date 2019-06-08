const puppeteer =require("puppeteer")
const  {buildUserRegistration} = require('../test-utils')

let page
let browser
const width = 820
const height = 800

beforeAll(async () => {
    browser = await puppeteer.launch({
          headless: true,
          //dumpio: true,
          slowMo: 80,
          args: [`--window-size=${width},${height}`]
        },100000);
    page = await browser.newPage();
    await page.setViewport({ width, height });
})
afterAll(() => {
    browser.close();
})

var logInToPage = async (username,password) => {
      await page.goto("http://localhost:3000/account/login")
      await page.waitForSelector("#login-form")
      await page.click("input[name=userEmail]")
      await page.type("input[name=userEmail]", username)
      await page.click("input[name=userPassword]")
      await page.type("input[name=userPassword]", password)
      await page.click("button[name=login]")
}

describe("User visits login page", () => {

     it("will display login in link in header before loging in that takes you to login page", async () =>{
      await page.goto("http://localhost:3000/")
      await page.waitForSelector("#table")
      await page.click("#login-link")
      await page.waitForSelector("#login-form")
      expect (page.url()).toBe("http://localhost:3000/account/login")
    },100000),
    it("can enter credentials and displays welcome message and logout link in header after login", async () =>{
      await logInToPage("JohnDough20@test.com","Yarpyarp1")
      //await page.waitForSelector(".welcome a")
      await page.waitForNavigation({waitUntil: 'load'})
      const text = await page.$eval('h1', el => el.innerText)
      const welcomeMessage = await page.$eval('.welcome', el=>el.innerText)
      expect(welcomeMessage.toLowerCase()).toContain('')
      expect(welcomeMessage).toContain('Log Out')
      await page.click(".welcome a")
    },100000),
    it("Will navigate to homepage and display log in link in headeder after logout", async () => {
      await logInToPage("JohnDough20@test.com","Yarpyarp1")
      await page.waitForSelector(".welcome a")
      await page.click(".welcome a")
      page.waitForNavigation({waitUntil: 'load'})
      expect (page.url()).toBe("http://localhost:3000/")
    },100000),
    it("will stay on same page and show error if incorrect login is entered", async () => {
      await logInToPage("JohnDough20@test.com", "BadBADpassword")
      await page.waitForSelector('strong')
      const text = await page.$eval('strong', el => el.innerText)
      expect (text).toContain("Error")
    },100000)

})
