import React, { useState } from 'react';

export default function Selected() {

  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillChange = (event) => {
    const selectedSkill = event.target.value;
    setSelectedSkills([...selectedSkills, selectedSkill]);
    
  };

  const languageOptions = [
    { id: 'en', name: 'English' },
    { id: 'mer', name: 'Meru' },
    { id: 'pt_BR', name: 'Brazilian Portuguese' },
    { id: 'hi', name: 'Hindi' },
    { id: 'ar', name: 'Arabic' },
  ];
  const handleLSkillChange = (skillOptions) => {
    const selectedSkillID = skillOptions.map((option) => option.id);
    setSelectedSkills(selectedSkillID);
  };
  
  const handleSub=()=>{
    console.log(selectedSkills);
  }

  return (
    <div style={{width:'400px'}}>
      {selectedSkills.map((skill, index) => (
        <input
          key={index}
          type="text"
          value={skill}
          onChange={(event) => {
            const updatedSkills = [...selectedSkills];
            updatedSkills[index] = event.target.value;
            setSelectedSkills(updatedSkills);
          }}
        />
      ))}
      <select value="" onChange={handleSkillChange}>
        <option value="">Select a skill</option>
        {languageOptions.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <button onClick={handleSub}>submit</button>
      
    </div>
  );
}