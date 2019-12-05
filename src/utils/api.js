const api = "/api"

const headers ={
  'Accept': 'application/json'
}

export function fetchRecentGrid(username){
  //TODO: catch error from API
  return fetch(`${api}/users/${username}/grids/recent`, {headers}).then(res => res.json()).then( grid=> grid)
}

export function postEvent(event){
  //make api call to update and return updated event
  //TODO: what is the URL and what should the body be
  fetch(`${api}/users/JohnDough20/grids/5c25552a6936d241c2f1bbba/events/${event}`, {
	method: 'put',
		headers: {
	"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	},
	body: 'foo=bar&lorem=ipsum'
   })
	.then(json)
	.then(function (data) {
	  console.log('Request succeeded with JSON response', data);
	}).catch(function (error) {
	  console.log('Request failed', error);
    })
}
