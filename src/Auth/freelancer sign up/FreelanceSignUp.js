import React, { useEffect, useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router';
import '../client sign up/ClientSignUp.css'
import Select from 'react-dropdown-select';
import axios from 'axios';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
function FreelanceSignUp() {

    const navigate = useNavigate();
    function handleSingIn(){
        navigate("/signin")
    }

    const [formData ,setFormData] = useState({
        firstName:'', lastName:'', email:'', password:'', confirmPassword:'',
        age: '', zipCode:'',
        position:'', description:'',
        education:'', exprirnces:'',hourlyRate:'', protfolioUrl:''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectCountry, setSelectCountry] = useState();
    const [selectSate, setSelectState] = useState();
    const [selectCity, setSelectCity] = useState();
    const [phone, setPhone] = useState();

    const [languages, setLanguages] = useState([])

    const [skills, setSkills] = useState([])

    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});

    const [data, setData] = useState([])
    const [getState, setState] = useState([])
    const [cities, setCities] = useState([])

    useEffect(()=>{
        axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json').then(res=>setData(res.data)).catch(err=>console.log(err))
    },[])
    const country = [...new Set(data.map(item=> item.country))];
    country.sort();

    const handleCountry = (e) =>{
        setSelectCountry(e.target.value);
      let states = data.filter(state => state.country === e.target.value); 
      states = [...new Set(states.map(item=>item.subcountry))]
      states.sort();
      setState(states);
    }

    const handleState =(e)=>{
        setSelectState(e.target.value);
      let cities = data.filter(city => city.subcountry === e.target.value)
      setCities(cities)

    }

    const languageOptions = [
        { id: 1, name: 'English' },
        { id: 2, name: 'German' },
        { id: 3, name: 'French' },
        { id: 4, name: 'Chinese' },
        { id: 5, name: 'Arabic' },
      ];
      const handleLanguageChange = (languageOptions) => {
        const selectedLanguageNames = languageOptions.map((option) => option.name);
        setLanguages(selectedLanguageNames);
      };

    const skillOptions = [
        { id: 1, name: 'HTML' },
        { id: 2, name: 'CSS' },
        { id: 3, name: 'JAVASCRIPT' },
        { id: 4, name: 'C#' },
        { id: 5, name: '.NET FRAMWORK' },
      ];
      const handleLSkillChange = (skillOptions) => {
        const selectedSkillNames = skillOptions.map((option) => option.name);
        setSkills(selectedSkillNames);
      };
    const handleChande = (e)=>{
        const {name, value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]: value
        }));
    };
    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
      };

    const handleNext = () => {
        if (step === 1) {
            /*if(!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
                alert('Please fill in all fields');
                return;
            }else if(formData.password !== formData.confirmPassword){
                alert('the password does  not match the confirmed password')
                return ;
            }*/
            const validationErrors = validateFormStep1();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            setErrors({});
        }else if (step === 2){
            const validationErrors = validateFormStep2();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            setErrors({});
        }else if (step === 3){
            const validationErrors = validateFormStep3();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            setErrors({});
        }
        setStep((prevStep) => prevStep + 1);
      };

      const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
      };

      const validateFormStep1 =()=>{
        const errors = {};
        if (!formData.firstName) {
            errors.firstName = 'First Name is required';
        }
        if (!formData.lastName) {
            errors.lastName = 'Last Name is required';
        }
        if (!formData.email) {
        errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
        }      
        if (!formData.password) {
        errors.password = 'Password is required';
        } else if (formData.password.length < 8) {
        errors.password = 'Password should be at least 8 characters long';
        } else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$_.]).{8,}$/.test(formData.password)){
            errors.password = "Password mut be at least one capital character, small  character, number and special character.";
        }
        if (!formData.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
        } else if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
      }

      const validateFormStep2 =()=>{
        const errors = {};
        if (!formData.age) {
            errors.age = 'Age is required';
        }
        if (!selectCountry) {
            errors.country = 'Country is required';
        }
        if (!selectSate) {
            errors.state = 'State is required';
        }
        if (!selectCity) {
            errors.state = 'City is required';
        }
        if (!formData.zipCode) {
            errors.zipCode = 'Zip code is required';
        }
        if (!phone) {
            errors.phone = 'Phone is required';
        }
        return errors;
      }

      const validateFormStep3 =()=>{
        const errors = {};
        if (!formData.position) {
            errors.position = 'Position is required';
        }
        if (!formData.description) {
            errors.description = 'Description is required';
        }
        if (!selectedImage) {
            errors.pictureUrl = 'Picture is required';
        }
        if (skills.length === 0) {
            errors.skills = 'Skills code is required';
        }
        if (languages.length === 0) {
            errors.languages = 'Language is required';
        }
        return errors;
      }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        console.log(selectedImage);
        console.log(languages);
        console.log(selectCountry);
        console.log(selectSate);
        console.log(selectCity);
        console.log(phone);
        console.log(skills);
        console.log(errors);
        
    }

  return (
    <div className='box'>
        <div className="sec" id="sec">
        <div className="sign-up">
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <div className="social-icons">
                <a href="#" className="icon"><FaGoogle /></a>
                </div>
                <div>
                    <div className='progressbar'>
                        <div style={{width: step === 1 ? "25%" : step === 2 ? "50%" : step === 3 ? "75%" : "100%"}}></div>
                    </div>
                </div>
                {step === 1 && (
                    <div className='steps'>
                    <input type="text" name='firstName' value={formData.firstName} onChange={handleChande} placeholder="FirstName" />
                    {errors.firstName && <span className='error'>{errors.firstName}</span>}
                    <input type="text" name='lastName' value={formData.lastName} onChange={handleChande} placeholder="LastName"/>
                    {errors.lastName && <span className='error'>{errors.lastName}</span>}
                    <input type="email" name='email' value={formData.email} onChange={handleChande} placeholder="Email" required />
                    {errors.email && <span className='error'>{errors.email}</span>}
                    <input type="password" name='password' value={formData.password} onChange={handleChande} placeholder="Password" />
                    {errors.password && <span className='error'>{errors.password}</span>}
                    <input type="password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChande} placeholder="Confirm Password" />
                    {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
                    <button type="button" onClick={handleNext}>Next</button>
               </div>
                )}

                {step === 2 && (
                    <div className='steps'>
                    <input type="number" name='age' value={formData.age} onChange={handleChande} placeholder="Age"/>
                    {errors.age && <span className='error'>{errors.age}</span>}
                    <select className='form-select my-1' value={selectCountry} onChange={(e)=>handleCountry(e)}>
                        <option value=''>select country</option>
                        {country.map(item=> <option key={item} >{item}</option>)}
                    </select>
                    {errors.country && <span className='error'>{errors.country}</span>}
                    <select className='form-select my-1' value={selectSate} onChange={(e)=>handleState(e)}>
                        <option value=''>select state</option>
                        {getState.map(item=> <option key={item} >{item}</option>)}
                    </select>                    
                    {errors.state && <span className='error'>{errors.state}</span>}
                    <select className='form-select my-1' value={selectCity} onChange={(e)=>setSelectCity(e.target.value)}>
                        <option value=''>select city</option>
                        {cities.map(item=> <option key={item.name} >{item.name}</option>)}
                    </select>
                    {errors.city && <span className='erorr'>{errors.city}</span>}
                    <input type="number" name='zipCode' value={formData.zipCode} onChange={handleChande} placeholder="Zip code"/>
                    {errors.zipCode && <span className='error'>{errors.zipCode}</span>}
                    <PhoneInput placeholder="Enter phone number" value={phone} onChange={setPhone}/>
                    {errors.phone && <span className='error'>{errors.phone}</span>}
                    <button onClick={handleBack}>Back</button>
                    <button type='button' onClick={handleNext}>Next</button>

                </div> 
                )}

                {step === 3 && (
                    <div className='steps'>
                    <input type="text" name='position' value={formData.position} onChange={handleChande} placeholder="Position"/>
                    {errors.position && <span className='error'>{errors.position}</span>}
                    <textarea className="form-control" name='description' value={formData.description} onChange={handleChande} placeholder="Description about you"></textarea>
                    {errors.description && <span className='error'>{errors.description}</span>}
                    <Select
                        options={skillOptions}
                        labelField="name"
                        valueField="id"
                        multi
                        onChange={handleLSkillChange}
                        color='#65B741'
                    />
                    {errors.skills && <span className='error'>{errors.skills}</span>}
                    <Select
                        options={languageOptions}
                        labelField="name"
                        valueField="id"
                        multi
                        onChange={handleLanguageChange}
                        color='#65B741'
                    />
                    {errors.language && <span className='error'>{errors.language}</span>}
                    <input className='form-control' type="file" accept="image/*" name='pictureUrl' onChange={handleImageChange} placeholder="Url of your picture"/>
                    {errors.pictureUrl && <span className='error'>{errors.pictureUrl}</span>}
                    <button onClick={handleBack}>Back</button>
                    <button type='button' onClick={handleNext}>Next</button>

                </div> 
                )}

                {step === 4 && (
                    <div className='steps'>
                    <input type="number" name='hourlyRate' value={formData.hourlyRate} onChange={handleChande} placeholder="hourlyRate($.. per hour)"/>
                    <textarea className="form-control" name='education' value={formData.education} onChange={handleChande} placeholder="Education"></textarea>
                    <textarea className="form-control" name='exprirnces' value={formData.exprirnces} onChange={handleChande} placeholder="Exprirnces"></textarea>
                    <input type="url" name='protfolioUrl' value={formData.protfolioUrl} onChange={handleChande} placeholder="Protfolio Url"/>
                    <button onClick={handleBack}>Back</button>
                    <button type='submit'>Submit</button>

                </div> 
                )}
            </form>
        </div>
        <div className="toggle-sec">
            <div className="toggle">
                <div className="toggle-panel">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button onClick={handleSingIn} id="login">Sign In</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
export default FreelanceSignUp;