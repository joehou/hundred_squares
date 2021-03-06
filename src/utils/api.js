const api = "/api"

const headers ={
  'Accept': 'application/json'
}

export function fetchRecentGrid(username){
  //TODO: catch error from API
  return fetch(`${api}/users/${username}/grids/recent`, {headers}).then(res => res.json()).then( grid=> grid)
}

export function postNewEvent(event,username,grid){
  return fetch(`${api}/users/${username}/grids/${grid}/events`, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
   })
	.then(res=>res.json())
	.then( event=>event)
	.catch(function (error) {
    })
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

export function deleteEditEvent(event,username,grid){
  return fetch(`${api}/users/${username}/grids/${grid}/events/${event._id}`, {
    method: 'delete',
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
