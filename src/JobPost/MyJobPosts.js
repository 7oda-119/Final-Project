import React, { useEffect, useState } from 'react';
import './JobPost.css'; // Import CSS file
import axios from 'axios';
import { baseUrl } from '.././Api/Api';
import Cookie from 'cookie-universal'
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
const JobPostPage = () => {
  const [myJobs, setMyJobs] = useState([]);

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  //fetch my jobs
  useEffect(() => {
    fetcMyJobs();
  }, []);
  
  const fetcMyJobs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/JobPosts/Get-All-My-Project-Post`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      setMyJobs(response.data.sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error(error);
      }
    };
    
    // Handle delete job
  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job post?')) {
      try {
        await axios.delete(`${baseUrl}/api/JobPosts/${jobId}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast(`Deleted job has been successful`)
        fetcMyJobs();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //show data in edit
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const handleEdit = async (id) => {
    handleShow();
    try {
      const response = await axios.get(`${baseUrl}/api/JobPosts/Get-job-post-by-Id?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setEditId(id)
      setEditTitle(response.data.title)
      setEditDescription(response.data.description)
      setEditPrice(response.data.price)
      /// Extract date and time from durationTime
      const durationTime = new Date(response.data.durationTime);
      const date = moment(durationTime).format('YYYY-MM-DD');
      const time = moment(durationTime).format('HH:mm:ss');
      
      // Set the extracted date and time as the value for the respective input fields
      setEditDate(date);
      setEditTime(time);
    }catch (error) {
        console.log(error);
    }
  }
  // update job
  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/api/JobPosts/${editId}`,{
        title : editTitle ,
        description : editDescription,
        price : parseInt(editPrice),
        durationTime : `${editDate}T${editTime}`
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast(`${editTitle} has been updated`)
      fetcMyJobs();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container' style={{minHeight:'84vh'}}>
      <h3 className='text-center mt-5 mb-3'>Creating Job</h3>
      {myJobs ? (<div>
        {myJobs.map((job)=><div className='d-flex justify-content-center mt-2' key={job.id}>
        <div style={{minWidth:'750px'}} >
          <div  className="job-post-container">
            <h3 className="job-post-s-title">{job.categoryName}</h3>
            <p className="job-post-detail"><span className="job-post-label">Title:</span> {job.title}</p>
            <p className="job-post-detail"><span className="job-post-label">Description:</span>  {job.description}</p>
            <p className="job-post-detail"><span className="job-post-label">Price :</span> {job.price}</p>
            <p className="job-post-detail"><span className="job-post-label">Duration:</span> {job.durationTime}</p>
            <div className="job-post-s-buttons btn-group">
              <button className="btn btn-success" onClick={()=>handleEdit(job.id)}>Update</button>
              <button className="btn btn-danger" onClick={() => handleDeleteJob(job.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>)}
      </div>) : (
        <div style={{maxWidth:'500px', minHeight:'78vh'}} className='container'>
        <h1 className='text-danger font-weight-bold my-5'>There Are No Jobs With This Name</h1>
    </div>
      )}
      
      {show && (
  <div className="modal" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Enter Name and Title</h5>
          <button className="btn-close" onClick={handleClose}>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleUpdateJob}>
            <div>
              <label className='edit-job-post-label'>Title:</label>
              <input className='edit-job-post-input'
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div>
              <label className='edit-job-post-label'>Description:</label>
              <input className='edit-job-post-input'
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>
            <div>
              <label className='edit-job-post-label'>Price:</label>
              <input className='edit-job-post-input'
                type="text"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </div>
            <div >
              <label className='edit-job-post-label'>durationDate:</label>
              <input className='edit-job-post-input'
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>
            <div>
              <label className='edit-job-post-label'>durationTime:</label>
              <input className='edit-job-post-input'
                type="time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary my-2">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )}
  <ToastContainer />
    </div>
  );
};

export default JobPostPage;
