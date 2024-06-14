import React, { useState } from 'react';
import './ContractForm.css';

const Form = () => {
  const [formData, setFormData] = useState({
    termsAndConditions: '',
    price: '',
    startDate: '',
    endDate: '',
    paymentWay: '',
    projectDetails: '',
    signature: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can perform further actions here like sending the form data to the server
  };

  return (
    <div className='contract'>
      <div className="form-container">
        <h2>Create Contract</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Price:</label>
            <input className="form-input"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group date-group">
            <div className="date-input">
              <label>Start Date:</label>
              <input className="form-input"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="date-input">
              <label>End Date:</label>
              <input className="form-input"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Payment Way:</label>
            <input className="form-input"
              type="text"
              name="paymentWay"
              value={formData.paymentWay}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Terms and Conditions:</label>
            <textarea
              name="termsAndConditions"
              value={formData.termsAndConditions}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Project Details:</label>
            <textarea
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Signature:</label>
            <input className="form-input"
              type="text"
              name="signature"
              value={formData.signature}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="sb-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;