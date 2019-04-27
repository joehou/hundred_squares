const api = "/api"

const headers ={
  'Accept': 'application/json'
}

export function fetchRecentGrid(username){
  console.log(process.env.NODE_ENV)
  console.log(`user in fetch users: ${username} `)
  return fetch(`${api}/users/${username}/grids/recent`, {headers}).then(res => res.json()).then( grid=> grid)
}
