import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { baseUrl } from '../Api/Api';
import Cookie from 'cookie-universal'

export default function EditInfoFreelancer({ isOpen, closeModal }) {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Age, setAge] = useState('');
  const [ZIP, setZIP] = useState('');
  const [YourTitle, setYourTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Education, setEducation] = useState('');
  const [Experience, setExperience] = useState('');
  const [HourlyRate, setHourlyRate] = useState('');
  const [PortfolioURl, setPortfolioURl] = useState('');
  const [Country, setCountry] = useState();
  const [State, setSelectState] = useState();
  const [Address, setAddress] = useState();
  const [PhoneNumber, setPhoneNumber] = useState();

  const [data, setData] = useState([])
  const [getState, setState] = useState([])
  const [cities, setCities] = useState([])

    useEffect(()=>{
        axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json').then(res=>setData(res.data)).catch(err=>console.log(err))
    },[])
    const country = [...new Set(data.map(item=> item.country))];
    country.sort();

    const handleCountry = (e) =>{
        setCountry(e.target.value);
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

    const cookies = Cookie();
    const token = cookies.get('freelanceCookie');

      //fetch freelancer information
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Account/Freelancer-Account`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setCountry(response.data.country);
      setSelectState(response.data.state);
      setAddress(response.data.address);
      setAge(response.data.age);
      setPhoneNumber(response.data.phoneNumber);
      setHourlyRate(response.data.hourlyRate);
      setDescription(response.data.description);
      setEducation(response.data.education);
      setExperience(response.data.experience);
      setPortfolioURl(response.data.portfolioURl);
      setZIP(response.data.zip);
      setYourTitle(response.data.yourTitle);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfileInfo =async()=>{
    const formData = new FormData();
        formData.append('FirstName', FirstName);
        formData.append('LastName', LastName);
        formData.append('Age', Age);
        formData.append('ZIP', ZIP);
        formData.append('YourTitle', YourTitle);
        formData.append('Description', Description);
        formData.append('Education', Education);
        formData.append('Experience', Experience);
        formData.append('HourlyRate', HourlyRate);
        formData.append('PortfolioURl', PortfolioURl);
        formData.append('Country', Country);
        formData.append('State', State);
        formData.append('Address', Address);
        formData.append('PhoneNumber', PhoneNumber);
    try{
      const response = await axios.post(`${baseUrl}/api/Account/Change-Name-Phone-Age-Language-ZIP-Address-Experience-Education-PortfolioURl-Description-YourTitle-HourlyRate-Freelancer`,formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <div>
      <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal Title</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <div className="mb-1">
                <label className='form-label mb-1' >First Name</label>
                <input type="text" className="form-control" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="mb-1">
                <label className='form-label mb-1'>Last Name</label>
                <input type="text" className="form-control" value={LastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="mb-1">
              <label className='form-label mb-1'>Age</label>
                <input type="number" className="form-control" value={Age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="mb-1">
              <label className='form-label mb-1'>Phone Number</label>
              <PhoneInput value={PhoneNumber} onChange={setPhoneNumber}/>
              </div>
              <div className="mb-1">
              <label className='form-label mb-1'>Zip Code</label>
                <input type="text" className="form-control" value={ZIP} onChange={(e) => setZIP(e.target.value)} />
              </div>
              <div className="mb-1">
                <select className='form-select my-1' value={Country} onChange={(e)=>handleCountry(e)}>
                  <option value=''>select country</option>
                  {country.map(item=> <option key={item} >{item}</option>)}
                </select>
              </div>
              <div className="mb-1">
                <select className='form-select my-1' value={State} onChange={(e)=>handleState(e)}>
                  <option value=''>select state</option>
                  {getState.map(item=> <option key={item} >{item}</option>)}
                </select>                    
              </div>
              <div className="mb-1">
                <select className='form-select my-1' value={Address} onChange={(e)=>setAddress(e.target.value)}>
                  <option value=''>select city</option>
                  {cities.map(item=> <option key={item.name} >{item.name}</option>)}
                </select>
              </div>
              <div className="mb-1">
                <label className='form-label mb-1'>Education</label>
                <input type="text" className="form-control" value={Education} onChange={(e) => setEducation(e.target.value)} />
              </div>
              <div className="mb-1">
                <label className='form-label mb-1'>Portfolio URL</label>
                <input type="url" className="form-control" value={PortfolioURl} onChange={(e) => setPortfolioURl(e.target.value)} />
              </div>
              <div className="mb-1">
                <label className='form-label mb-1'>Experience</label>
                <textarea className="form-control" value={Experience} onChange={(e) => setExperience(e.target.value)} rows="3"></textarea>
              </div>
              <div className="mb-1">
                <label className='form-label mb-1'>Description</label>
                <textarea className="form-control" value={Description} onChange={(e) => setDescription(e.target.value)} rows="3"></textarea>
              </div>
              <div className="mb-1">
                <label className='form-label mb-1'>Your Position</label>
                <input type="text" className="form-control" id="phone" value={YourTitle} onChange={(e) => setYourTitle(e.target.value)} />
              </div>
              <div className="mb-1">
              <label className='form-label mb-1'>Hourly Rate</label>
                <input type="text" className="form-control" id="phone" value={HourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className='btnbtn-' onClick={closeModal}>Close</button>
              <button type="button" className='btn btn-primary' onClick={updateProfileInfo}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
