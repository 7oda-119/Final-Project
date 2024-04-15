import React from 'react'
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { baseUrl } from '../Api/Api';
import Cookie from 'cookie-universal'
import axios from 'axios';
export default function Password({ show, onHide }) {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [errorRes, setErrorRes] = useState('');

  const validateForm = () =>{
    const newErrors = {};
    if (!oldPassword) {
      newErrors.oldPassword = 'Password is required';
      } else if (oldPassword.length < 8) {
      newErrors.oldPassword = 'Password should be at least 8 characters long';
      }

    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
      } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password should be at least 8 characters long';
      }else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$_.]).{8,}$/.test(newPassword)){
        newErrors.newPassword = "Password mut be at least one capital character, small  character, number and special character.";
      }
      
      if (!confirmNewPassword) {
      newErrors.confirmNewPassword = 'Confirm Password is required';
      } else if (confirmNewPassword !== newPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
      }
      return newErrors;
  }
  

  //get token
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')

  const handeleChangePass = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    try{
      const response = await axios.post(`${baseUrl}/api/Account/ChangePassword-All`, {oldPassword, newPassword, confirmNewPassword},{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      window.location.reload();
    }catch(err){
      console.log(err.response.data)
      if(err.response.data === "Failed to change password"){
        setErrorRes('the old password not correct')
      }
    }
  };
  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handeleChangePass}>
            <Form.Group controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={oldPassword}
                onChange={(e)=>setOldPassword(e.target.value)}
              />
            </Form.Group>
            {errors.oldPassword && <span className='erorr'>{errors.oldPassword}</span>}
            <Form.Group controlId="newPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
              />
            </Form.Group>
            {errors.newPassword && <span className='erorr'>{errors.newPassword}</span>}
            <Form.Group controlId="confirmNewPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                value={confirmNewPassword}
                onChange={(e)=>setConfirmNewPassword(e.target.value)}
              />
            </Form.Group>
            {errors.confirmNewPassword && <span className='erorr'>{errors.confirmNewPassword}</span>}
            <div>
            <Button variant="primary" type="submit" className='my-2'>
              Save 
            </Button>
            </div>
            {errorRes && <span className='erorr'>{errorRes}</span>}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
