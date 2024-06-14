import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import Cookie from 'cookie-universal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
function JobApplicants() {
  let {jobId} = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');

  useEffect(() => {
    fetchApplicants();
  }, []);

  //fetch who Applied on the Task
  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/ApplyTasks/Client-Applicants?jobId=${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setApplicants(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      const errorPages = error.response.status;
      if (errorPages === 403) {
        navigate('/error403');
      } else if (errorPages === 401) {
        navigate('/error401');
      } else if (errorPages === 500) {
        navigate('/error500');
      } else {
        console.log(error.response);
      }
    }
  };

  //accept freelancer on the task
  const accept = async (taskId, name) => {
    try {
      const response = await axios.put(`${baseUrl}/api/ApplyTasks/Client-Accept-Applicant?taskId=${taskId}`, { taskId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchApplicants();
      toast.success(`${name} accpeting on this task successfully.`);
    } catch (error) {
      console.log(error.response);
    }
  };
  
  //reject freelancer on the task
  const reject = async (taskId, name) => {
    try {
      const response = await axios.put(`${baseUrl}/api/ApplyTasks/Client-Reject-Applicant?taskId=${taskId}`, { taskId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchApplicants();
      toast.success(`${name} Rejecting on this task successfully.`);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
  <div style={{ minHeight: '90vh', paddingTop: '20px' }}>
    <div className="applicants-container">
      {applicants.length > 0? (
        applicants.map((data) => (
          <div key={data.taskId} className="applicant">
            <img src={data.freelancerProfilePictureUrl} alt="Profile" className="profile-picture" />
            <div className="applicant-info">
              <div className="title-container">
                <Link to={`/freelancers/Profile/${data.freelancerId}`} className="full-name">
                  {data.freelancerFullName}
                </Link>
              </div>
              <p className="title">{data.freelancertitle}</p>
              <p className="hourly-rate">Hourly Rate: ${data.freelancerhourlyRate}/hour</p>
              <p className="description">{data.freelancerDescription}</p>
            </div>
            <div className="btn-Applicants btn-group">
              <button className="btn btn-primary" onClick={() => accept(data.taskId, data.freelancerFullName)}>
                Accept
              </button>
              <button className="btn btn-danger" onClick={() => reject(data.taskId, data.freelancerFullName)}>
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="no-applicant">
          <h1>There Are No applicants for this job</h1>
        </div>
      )}
    </div>
    <ToastContainer position="top-center" />
  </div>
  )
}

export default JobApplicants