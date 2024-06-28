import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../Api/Api';
import Select from 'react-dropdown-select';

function LanguageChange({ isOpen, onClose, token, fetchInfo }) {

  useEffect(() => {
    fetchLanguages();
    fetchMyLanguages();
}, []);

    const [myLanguages, setMyLanguages] = useState([])
    const fetchMyLanguages = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/Account/Get-User-Languages`,{
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log(response.data);
            setMyLanguages(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const [SelectedLanguages, setSelectedLanguages] = useState([])
    const [languageOptions, setLanguageOptions] = useState();
    
  
    const fetchLanguages = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/Language/Get-All-Language-With-Id`);
            console.log(response.data);
            setLanguageOptions(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const handleLanguageChange = (languageOptions) => {
        const selectedLanguageID = languageOptions.map((option) => option.id);
        setSelectedLanguages(selectedLanguageID);
    };
    
    const addLanguages = async()=>{
      const formData = new FormData();
      SelectedLanguages.forEach((lang, index) => {
        formData.append('SelectedLanguages', lang); 
    });
      try{
        const response = await axios.post(`${baseUrl}/api/Account/Change-Languages-Only`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
        })
        fetchInfo();
        onClose();
    }
    catch(err){
        console.log(err)
    }
    }

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Skills</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            {/* Add your form for editing skills here */}
            <Select 
                placeholder='Select Languages'
                options={languageOptions}
                labelField="value"
                valueField="value"
                multi
                onChange={handleLanguageChange}
                color='#65B741'
                values={myLanguages}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={addLanguages}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageChange;