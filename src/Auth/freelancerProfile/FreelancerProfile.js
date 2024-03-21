import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import './FreelancerProfile.css'
import { FaUserEdit } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
function FreelancerProfile() {

  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [position, setPosition] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedSubSkills, setSelectedSubSkills] = useState([]);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.value);
  };
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  const handleLinkedinChange = (event) => {
    setLinkedin(event.target.value);
  };
  
  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
    setSelectedSubSkills([]);
  };

  const handleSubSkillChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedSubSkills(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any logic here, such as making an API call or updating the application state
    console.log("Submitted data:", {
      photo,
      name,
      linkedin,
      position,
      selectedSkill,
      selectedSubSkills,
    });
    // Clear form inputs and selected subskills
    setPhoto("");
    setName("");
    setLinkedin("");
    setPosition("");
    setSelectedSkill("");
    setSelectedSubSkills([]);
    setShowModal(false);
  };
      
  return (
    <div>
        <div className='account d-flex justify-content-center '>
            <div className="account-info col-lg-12 row py-3">
                <div className="d-flex py-3" > 
                    <div>
                        <img className='user-photo' src="https://t4.ftcdn.net/jpg/00/65/10/47/360_F_65104718_x17a76wzWKIm3BlhA6uyYVkDs9982c6q.jpg" alt="photo" style={{width:'100px', height:'100px', borderRadius:'50%'}}/>
                    </div>
                    <div className='p-2'>
                        <h2>{name}</h2>
                        <span><IoLocationOutline />Mansura-Egypt</span>
                    </div>    
                </div>
                <div className="row">
                    <div className="about col-lg-7">
                        <div className="px-2 py-3">
                            <h3 className='py-2'>{position}</h3>
                            <h4>About:</h4>
                            <p className='px-4'> i am student in ........</p>
                            <a href="#" className='linkedin'>{linkedin}</a>    
                        </div>  
                    </div>
                    <div className="Skills col-lg-5 py-3">
                        <div className='py-2'>
                            <h4>Skills</h4>
                            {selectedSubSkills.map((skill,index)=><span key={index}>{skill}</span>)}
                        </div>  
                        <div className='py-3'>
                            <p>Languages:</p>
                            <span>English</span>
                        </div>
                        <button className='btn-edit col-lg-1 float-right' onClick={handleOpenModal}><FaUserEdit /></button>
                    </div>  
                </div>           
            </div>
        </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter photo URL"
                value={photo}
                onChange={handlePhotoChange}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
              />
            </Form.Group>

            <Form.Group controlId="formLinkedin">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter LinkedIn URL"
                value={linkedin}
                onChange={handleLinkedinChange}
              />
            </Form.Group>

            <Form.Group controlId="formPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter position"
                value={position}
                onChange={handlePositionChange}
              />
            </Form.Group>

            <Form.Group controlId="formSkill">
              <Form.Label>Select Skill</Form.Label>
              <Form.Control
                as="select"
                value={selectedSkill}
                onChange={handleSkillChange}
              >
                <option value="">-- Select Skill --</option>
                <option value="skill1">Skill 1</option>
                <option value="skill2">Skill 2</option>
                <option value="skill3">Skill 3</option>
              </Form.Control>
            </Form.Group>
            {selectedSkill && (
              <Form.Group controlId="formSubSkills">
                <Form.Label>Select Subskills</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={selectedSubSkills}
                  onChange={handleSubSkillChange}
                >
                  {selectedSkill === 'skill1' && (
                    <>
                      <option value="subskill1">Subskill 1</option>
                      <option value="subskill2">Subskill 2</option>
                      <option value="subskill3">Subskill 3</option>
                    </>
                  )}
                  {selectedSkill === 'skill2' && (
                    <>
                      <option value="subskill4">Subskill 4</option>
                      <option value="subskill5">Subskill 5</option>
                      <option value="subskill6">Subskill 6</option>
                    </>
                  )}
                  {selectedSkill === 'skill3' && (
                    <>
                      <option value="subskill7">Subskill 7</option>
                      <option value="subskill8">Subskill 8</option>
                      <option value="subskill9">Subskill 9</option>
                    </>
                  )}
                </Form.Control>
              </Form.Group>
            )}
          </Form>
         </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
        </Modal.Footer>
        </Modal>
        
    </div>

  )
}


export default FreelancerProfile;