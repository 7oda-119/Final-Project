import React, { useState } from 'react';

const SkillSelectionForm = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillChange = (index, value) => {
    const newSkills = [...selectedSkills];
    newSkills[index] = value;
    setSelectedSkills(newSkills);
  };

  const addSkill = () => {
    setSelectedSkills([...selectedSkills, '']);
  };

  const removeSkill = (index) => {
    const newSkills = selectedSkills.filter((_, i) => i !== index);
    setSelectedSkills(newSkills);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    selectedSkills.forEach(skill => {
      formData.append('SelectedSkills', skill);
    });

    console.log(selectedSkills)
  };

  return (
    <div style={{minHeight:'90vh'}}>
        <form onSubmit={handleSubmit}>
        {selectedSkills.map((skill, index) => (
            <div key={index}>
            <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
            />
            <button type="button" onClick={() => removeSkill(index)}>-</button>
            </div>
        ))}
        <button type="button" onClick={addSkill}>Add integer item</button>
        <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default SkillSelectionForm;