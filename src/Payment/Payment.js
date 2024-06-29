import React, { useState } from 'react';
import { FaCreditCard, FaCcVisa, FaCcMastercard, FaCcAmex, FaQuestionCircle, FaPaypal, FaMobileAlt } from 'react-icons/fa';
import './Payment.css'; // Assuming you have a CSS file for custom styles
import { useNavigate, useParams } from 'react-router-dom';
import Cookie from 'cookie-universal'
import axios from 'axios';
import { baseUrl } from '../Api/Api';
function Payment() {
  const { freelancerId, jobPostId, price } = useParams();
  const amount = parseFloat(price)
  const [totalAmount, setTotalAmount] = useState(amount); 
  const deduction = totalAmount * 0.10;
  const restAmount = totalAmount - deduction;

  const [Owner, setOwner] = useState('')
  const [CardNumber, setCardNumber] = useState('')
  const [MM, setMM] = useState('')
  const [YY, setYY] = useState('')
  const [CVV, setCVV] = useState('')

  const navigate = useNavigate();
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');

  const createContract = async() =>{
    try{
      const response = await axios.post(`${baseUrl}/api/PaymentTest/Add-New-Payment`, {
        Owner, CardNumber, MM, YY, CVV, price:totalAmount, FreelancerId:freelancerId, jobId:jobPostId
      }  ,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      navigate(`/rating/${freelancerId}`);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="payment py-3 ">
      <div className="row mb-4">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-6">Payment</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <div className="card shadow">
            <div className="card-header">
              <div className=" pt-4 pl-2 pr-2 pb-2">
                <h4 className='d-flex justify-content-center'>
                    <FaCreditCard style={{marginRight:'3px', marginTop:'2px'}} /> <span >Credit Card</span>
                </h4>
                  
              </div>
              <div className="tab-content">
                <div id="credit-card" className="tab-pane fade show active pt-3">
                  <form role="form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                      <label htmlFor="username">
                        <h6>Card Owner</h6>
                      </label>
                      <input type="text" name="username" placeholder="Card Owner Name" required className="form-control" 
                      onChange={(e)=>{setOwner(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="cardNumber">
                        <h6>Card number</h6>
                      </label>
                      <div className="input-group card-number">
                        <input type="text" name="cardNumber" placeholder="Valid card number" className="form-control" required
                          onChange={(e)=>{setCardNumber(e.target.value)}}
                         />
                        <div className="input-group-append">
                          <span className="input-group-text text-muted cards">
                            <FaCcVisa className="mx-1" />
                            <FaCcMastercard className="mx-1" />
                            <FaCcAmex className="mx-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-8">
                        <div className="form-group">
                          <label>
                            <h6>Expiration Date</h6>
                          </label>
                          <div className="input-group">
                            <input type="number" placeholder="MM" name="expMonth" className="form-control" required style={{ width: '45%' }} 
                            onChange={(e)=>{setMM(e.target.value)}}
                            />
                            <input type="number" placeholder="YY" name="expYear" className="form-control ml-2" required style={{ width: '45%' }} 
                              onChange={(e)=>{setYY(e.target.value)}}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group mb-4">
                          <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
                            <h6>CVV <FaQuestionCircle className="d-inline" /></h6>
                          </label>
                          <input type="text" required className="form-control" 
                            onChange={(e)=>{setCVV(e.target.value)}}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3 text-center">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Total Amount: </label>
                          <span className="form-control-plaintext">${totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Deduction (10%): </label>
                          <span className="form-control-plaintext">-${deduction.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Rest Amount: </label>
                          <span className="form-control-plaintext">${restAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="button" className="subscribe btn btn-primary btn-block shadow-sm"
                        onClick={createContract}>Confirm Payment</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;