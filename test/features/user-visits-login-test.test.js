const puppeteer =require("puppeteer")
const  {buildUserRegistration} = require('../test-utils')

let page
let browser
const width = 1920 
const height = 1080

beforeAll(async () => {
    browser = await puppeteer.launch({
          headless: true,
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
  describe("starts with empty login on login page", () =>{
    it("Has the correct title", async () =>{
      const  expectedTitle = 'Login'
      await page.goto("http://localhost:3000/");
      // await page.waitForSelector('.welcome-message');
      const title = await page.title()
      expect(title).toBe(expectedTitle)
    },100000)
  })
})
