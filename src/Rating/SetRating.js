import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import axios from 'axios';
import Cookie from 'cookie-universal'
import { baseUrl } from '../Api/Api';
import Loader from '../components/Loader';

const RatingAndFeedbackForm = () => {
    
    const{ freelancerId } = useParams()
    const navigate = useNavigate();
    const cookies = Cookie();
    const token = cookies.get('freelanceCookie');
        
    const [loading, setLoading] = useState(false);

    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [taskCompletionPercentage, setTaskCompletionPercentage] = useState(100);


    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };
    const handleTaskCompletionChange = (event) => {
        setTaskCompletionPercentage(event.target.value);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        setLoading(true)

        try{
            const response = await axios.post(`${baseUrl}/api/Rating/Add-New-Rating`, {
                Rate:rating,TaskCompletesPersentage:taskCompletionPercentage, Comments:feedback,FreelancerId:freelancerId
            }  ,{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
            })
            setLoading(false)
            navigate('/myjobs');
        }catch(error){
            setLoading(false)
            console.log(error);
        }
    };

  return (
    <div className="container" style={{minHeight:'88vh'}}>
      <div style={{marginLeft:'-200px'}}>
        {loading && <Loader />}
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Rate and Provide Feedback</h2>
          <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Rating</label>
                <Rating style={{ maxWidth: '150px' }} value={rating} onChange={setRating} isRequired/>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="feedback">Feedback</label>
              <textarea
                className="form-control"
                id="feedback"
                rows="5"
                placeholder="Leave your feedback here"
                value={feedback}
                onChange={handleFeedbackChange}
              ></textarea>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="taskCompletionPercentage">Task Completion Percentage (%)</label>
              <input
                type="number"
                className="form-control"
                id="taskCompletionPercentage"
                min="0"
                max="100"
                value={taskCompletionPercentage}
                onChange={handleTaskCompletionChange}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RatingAndFeedbackForm;