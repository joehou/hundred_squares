const buildUserRegistration = (options={}) => {
  const username = options.username || "testuser"
  const password = options.password || "Password1"
  const firstName = options.firstName || "TestJoe"
  const lastName = options.lastName || "TestHou"
  const email = options.email || "test@test.com"
  return {username, password, firstName, lastName, email}
}

module.exports = {
  buildUserRegistration
}
