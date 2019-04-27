const buildUserRegistration = (options={}) => {
  const username = options.username || "testuser"
  const password = options.password || "Password1"
  const firstName = options.firstName || "TestJoe"
  const lastName = options.lastName || "TestHou"
  const email = options.email || "test@test.com"
  return {username, password, firstName, lastName, email}
}

var logInToPage = async (username,password) => {
      await page.goto("http://localhost:3000/account/login")
      await page.waitForSelector("#login-form")
      await page.click("input[name=userEmail]")
      await page.type("input[name=userEmail]", username)
      await page.click("input[name=userPassword]")
      await page.type("input[name=userPassword]", password)  
      await page.click("button[name=login]")
}

module.exports = {
  buildUserRegistration,
  logInToPage
}
