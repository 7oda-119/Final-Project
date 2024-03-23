import React from 'react';
import congratulate from '../image/Congratulation.png'
import './Congratulation.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../../Api/Api';
import axios from 'axios';
import { toast } from 'react-toastify';

function Congratulation() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token').replace(/\s/g, '+');
  const encodedToken = encodeURIComponent(token);
  const email = decodeURIComponent(params.get('email'));
  
  const handleConfirm = async () => {
    try {
      const response = await axios.post(`${baseUrl}/Confirm-Email?token=${encodedToken}&email=${email}`);
      toast(response.data)
      console.log(token)
      console.log(email)
      navigate('/signin')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='congrate'>
      <div>
        <img src={congratulate} alt="" height="250px" />
        <div className="cong">
          <h2>Congratulation</h2>
          <p>You have confirmed your email successfully and now you're ready to log in</p>
          <button onClick={handleConfirm}>Go to log in</button>
        </div>
      </div>
    </div>
  )
}
export default Congratulation;