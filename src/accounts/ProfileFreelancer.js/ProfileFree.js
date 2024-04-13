import React, { useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import './FreelancerProfile.css'
import { useNavigate } from 'react-router-dom';
import EditInfoFreelancer from '../../Modal/EditInfoFreelancer';
import Addportfolio from '../../Modal/Addportfolio';
export default function ProfileFree() {
    const navigate = useNavigate();
    function navToProtfolio(){
        navigate('/protfolio')
    }
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        closeImageModal();
    };

    const openImageModal = () => {
        setIsModalOpen(true);
    };

    const closeImageModal = () => {
        setIsModalOpen(false);
    };
    const saveImage = () => {
        // Perform save logic here
        closeImageModal();
    };

  const [modalInfoOpen, setModalInfoOpen] = useState(false);

  const openInfoModal = () => {
    setModalInfoOpen(true);
  };

  const closeInfiModal = () => {
    setModalInfoOpen(false);
  };

  const handleSaveInfo = (data) => {
    // Perform save logic with the data object
    console.log('Saved data:', data);
  };

  

  return (
    <div className='account d-flex justify-content-center '>
        <div className={`modal ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Photo</h5>
              <button type="button" className="btn-close" onClick={closeImageModal}></button>
            </div>
            <div className="modal-body">
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeImageModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={saveImage}>Save</button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <div className="modal-backdrop fade show"></div>}
            <div className="account-info col-lg-12 row ">
                <div className="head d-flex py-3 " > 
                    <div>

                        <img className='user-photo' src={selectedImage} alt="photo" style={{width:'100px', height:'100px', borderRadius:'50%'}}/>
                        <AiFillEdit className='edit-img' onClick={openImageModal}/>
                    </div>
                    <div className='px-3'>
                        <h2>Mahmoud AbdElfatah</h2>
                        <p>UserName</p>
                        <span><IoLocationOutline className='d-inline'/>Mansura-Egypt</span>
                        
                    </div>    
                </div>
                <div className='addp'>
                <button type='button' className='btn btn-primary' onClick={navToProtfolio}>Protfolio</button>
                </div>
                <div className="row">
                <div className="Skills col-lg-5 py-3">
                        <div className='py-2'>
                            <h4>Skills</h4>
                            <span>HTML</span>
                            <span>CSS</span>
                            <span>JS</span>
                        </div>  
                        <div className='py-3'>
                            <p>Languages:</p>
                            <span>English</span>
                        </div>
                        <button className='edit-skills' ><FaUserEdit /></button>
                    </div>
                    <div className="about col-lg-7 ">
                        <div className='d-flex justify-content-between'>
                        <div className=" px-2 py-3">
                            <h3 className='py-2'>Front-End</h3>
                              <p className='px-4'> 
                              i am student at alazhar university in depart system and computer engineering 
                              </p>
                        </div>  
                        <p className='py-4'>$15/hour</p>
                        </div>
                        <h4>LinkedIn:</h4>
                              <a href="#" className='linkedin'>linkedin</a>
                        <button className='edit-info' onClick={openInfoModal}><FaUserEdit /></button>
                    </div>
                    
                </div>           
            </div>
            <EditInfoFreelancer isOpen={modalInfoOpen} closeModal={closeInfiModal} saveData={handleSaveInfo} />
            
        </div>
  )
}
