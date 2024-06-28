import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from 'react-dropdown-select';
import { baseUrl } from '../../Api/Api';

function SkillChange({ isOpen, onClose, token, fetchInfo }) {

    const [SelectedSkills, setSelectedSkills] = useState([])
    const [skillOptions, setSkillOptions] = useState();
    useEffect(() => {
        fetchSkills();
        fetchMySkills();
    }, []);
    
    //fetch my skills
    const [mySkill, setMySkill] = useState();
    const fetchMySkills = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/Account/Get-User-Skills`,{
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log(response.data);
            setMySkill(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    //fetch skills
    const fetchSkills = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Skill/Get-All-SKills-With-Id`);
      console.log(response.data);
      setSkillOptions(response.data)
      
    } catch (error) {
      console.error(error);
    }
  };
    
    const handleLSkillChange = (skillOptions) => {
      const selectedSkillID = skillOptions.map((option) => option.id);
      setSelectedSkills(selectedSkillID);
    };


    const addSkills = async()=>{
        const formData = new FormData();
        SelectedSkills.forEach((skill, index) => {
            formData.append('SelectedSkills', skill); 
        });
        try{
          const response = await axios.post(`${baseUrl}/api/Account/Change-Skills-Only`, formData, {
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
                },
        })
        fetchInfo();
        onClose();
      }catch(err){
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
                options={skillOptions}
                labelField="name"
                valueField="name"
                multi
                onChange={handleLSkillChange}
                color='#65B741'
                values={mySkill}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={addSkills}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillChange;