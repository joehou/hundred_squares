const api = "/api"

const headers ={
  'Accept': 'application/json'
}

export function fetchRecentGrid(username){
  //TODO: catch error from API
  return fetch(`${api}/users/${username}/grids/recent`, {headers}).then(res => res.json()).then( grid=> grid)
}

export function postEvent(event,username,grid){
  return fetch(`${api}/users/${username}/grids/${grid}/events/${event._id}`, {
	method: 'put',
	headers: {
      'Content-Type': 'application/json'
	},
	body: JSON.stringify(event)
   })
	.then(res=>{
		res.json()
	} )
	.then(function (data) {
		data
	}).catch(function (error) {
    })
}
