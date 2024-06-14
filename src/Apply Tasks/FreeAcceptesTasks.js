import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
function AcceptesTasks() {
    const navigate = useNavigate();
    const [acceptedTasks, setAcceptedTasks] = useState([]);
    const cookies = Cookie();
    const token = cookies.get('freelanceCookie');

    useEffect(() => {
        fetchAcceptedTasks();
    }, []);

    //fetch the accepts tasks to do them
    const fetchAcceptedTasks = async () => {
        try {
        const response = await axios.get(`${baseUrl}/api/ApplyTasks/Freelancer-Accepted-Tasks`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        setAcceptedTasks(response.data.sort((a, b) => moment(b.orderDate).unix() - moment(a.orderDate).unix()));
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
  return (
    <div style={{minHeight:'87vh'}}>
      <div className="apply-tasks-container">
        <h2 className="mt-2">Applied Tasks</h2>
        {acceptedTasks.length > 0 ? (
          <div className="apply-tasks-list">
            {acceptedTasks.map((acceptedTask) => (
              <div key={acceptedTask.id} className="apply-task-container">
                <h3 className="apply-task-title">{acceptedTask.categoryName}</h3>
                <div className="apply-task-details">
                  <p>
                    <span className="apply-task-label">Title:</span> {acceptedTask.tasktitle}
                  </p>
                  <p>
                    <span className="apply-task-label">Description:</span> {acceptedTask.taskDescription}
                  </p>
                  <p>
                    <span className="apply-task-label">Price:</span> {acceptedTask.totalAmount}
                  </p>
                  <p>
                    <span className="apply-task-label">Order Date:</span> {moment(acceptedTask.orderDate).format('YYYY-MM-DDTHH:mm:ss')}
                  </p>
                  <p>
                    <span className="apply-task-label">Delivery Date:</span> {moment(acceptedTask.deliveryDate).format('YYYY-MM-DDTHH:mm:ss')}
                  </p>
                  <p>
                    <span className="apply-task-label">Client Name:</span> {acceptedTask.clientFullName}
                  </p>
                </div>
                <div className="apply-task-actions">
                  <button className="btn btn-primary" >Chat</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-jobs">
            <h1>Please check the jobs first and apply on the tasks you want</h1>
          </div>
        )}
      </div>
      <ToastContainer position="top-center"/>
    </div>
  )
}

export default AcceptesTasks;