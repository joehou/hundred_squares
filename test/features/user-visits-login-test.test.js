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
    it("can enter credentials and submit login", async () =>{
      await page.goto("http://localhost:3000/account/login")
      await page.waitForSelector("#login-form")
      await page.click("input[name=userEmail]")
      await page.type("input[name=userEmail]", "tyranthou@gmail.com")
      await page.click("input[name=userPassword]")
      await page.type("input[name=userPassword]", "Yarpyarp1") 
      await page.click("button[name=login]")
      await page.waitForNavigation({waitUntil: 'load'})
      const title = await page.$eval('h1', el => el.innerText)
      expect(title).toBe("Square")
    },100000)
  })
})
