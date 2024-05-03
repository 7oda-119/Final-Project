import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { baseUrl } from '../Api/Api';
import axios from 'axios';
export default function Selected() {

  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillChange = (event) => {
    const selectedSkill = event.target.value;
    setSelectedSkills([...selectedSkills, selectedSkill]);
    
  };

  const languageOptionss = [
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

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const [languageOptions, setLanguageOptions] = useState();
  const [selectedLanguages, setSelectedLanguages] = useState();
    //fetch skills
    useEffect(() => {
        fetchLanguages();
    }, []);
  
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

  return (
    <div style={{width:'400px'}}>
      <div className="App">
      <Select
        defaultValue={selectedLanguages}
        options={languageOptions}
        onChange={handleLanguageChange}
        isMulti
      />
    </div>
    </div>
  );
}