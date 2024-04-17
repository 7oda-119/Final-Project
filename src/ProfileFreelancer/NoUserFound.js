import React from 'react'
import { Link } from 'react-router-dom'

export default function NoUserFound() {
  return (
    <div className='NoUserFound d-flex align-items-center justify-content-center' style={{minHeight:'90vh', minWidth:'100%'}}>
        <div style={{maxWidth:'500px'}}>
            <h1 className='text-danger font-weight-bold'>We are sorry no user found with this name</h1>
            <div className='d-flex justify-content-center '>
            <Link to={`/freelancers`} className="backFree my-2">Go back</Link>
            </div>
        </div>
    </div>
  )
}
