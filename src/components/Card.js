import React from 'react'
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
export default function Card(props) {
    
  return (
    <div className='mx-2 my-2'>
        <div class="card" style={{width: "18rem"}}>
            <img class="card-img-top" src=".." alt="Card image cap" />
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text">{props.description}</p>
                <p class="card-text">{props.completionTime}</p>
                <p class="card-text">{props.skills}</p>
                <div className='btn btn-group'>
                  <button href="#" class="btn btn-success"><AiFillEdit className='d-inline' />Edit</button>
                  <button href="#" class="btn btn-danger"><MdDeleteOutline className='d-inline'/> Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}
