import React from 'react'
import { Alert } from 'reactstrap'

export default function Errorbox(props){
  const { closeErrorFunction } = props
  const { error, isError} = props.errorStore
  return(
    <div className="row justify-conten-center">
      <div className='col-6'>
        <Alert colors="danger" isOpen={isError} toggle={closeErrorFunction}>
          <strong> Error:</strong> { error && error.message ? error.message : 'an undefined error occurred' }
        </Alert>
      </div>
    </div>
  )
}
