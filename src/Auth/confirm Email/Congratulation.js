import React from 'react';
import congratulate from '../image/Congratulation.png'
import './Congratulation.css';
import { useNavigate } from 'react-router-dom';

function Congratulation() {
  const navigate = useNavigate();
  function goToLogIn(){
    navigate('/signin')
  }
  return (
    <div className='congrate'>
      <div>
        <img src={congratulate} alt="" height="250px" />
        <div class="cong">
          <h2>Congratulation</h2>
          <p>You have confirmed your email successfully and now you're ready to log in</p>
          <button onClick={goToLogIn}>Go to log in</button>
        </div>
      </div>
    </div>
  )
}
export default Congratulation;