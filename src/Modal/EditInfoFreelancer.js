import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function EditInfoFreelancer({ isOpen, closeModal, saveData }) {
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
  const [ProfilePicture, setProfilePicture] = useState(null);
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
              <div className="mb-2">
                <input type="text" className="form-control" id="firstName" value={FirstName} placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" id="lastName" value={LastName} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="mb-2">
                <input type="number" className="form-control" id="age" value={Age} placeholder='Age' onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="mb-2">
              <PhoneInput placeholder="Enter Phone number" value={PhoneNumber} onChange={setPhoneNumber}/>
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" id="phone" value={ZIP} placeholder='Zip code' onChange={(e) => setZIP(e.target.value)} />
              </div>
              <div className="mb-2">
                <select className='form-select my-1' value={Country} onChange={(e)=>handleCountry(e)}>
                  <option value=''>select country</option>
                  {country.map(item=> <option key={item} >{item}</option>)}
                </select>
              </div>
              <div className="mb-2">
                <select className='form-select my-1' value={State} onChange={(e)=>handleState(e)}>
                  <option value=''>select state</option>
                  {getState.map(item=> <option key={item} >{item}</option>)}
                </select>                    
              </div>
              <div className="mb-2">
                <select className='form-select my-1' value={Address} onChange={(e)=>setAddress(e.target.value)}>
                  <option value=''>select city</option>
                  {cities.map(item=> <option key={item.name} >{item.name}</option>)}
                </select>
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" id="phone" value={Education} placeholder='Education' onChange={(e) => setEducation(e.target.value)} />
              </div>
              <div className="mb-2">
                <input type="url" className="form-control" id="phone" value={PortfolioURl} placeholder='Protfolio URL' onChange={(e) => setPortfolioURl(e.target.value)} />
              </div>
              <div className="mb-2">
              <textarea class="form-control" placeholder='Experience' value={Experience} onChange={(e) => setExperience(e.target.value)} rows="3"></textarea>
              </div>
              <div className="mb-2">
              <textarea class="form-control" placeholder='Description' value={Description} onChange={(e) => setDescription(e.target.value)} rows="3"></textarea>
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" id="phone" value={YourTitle} placeholder='Position' onChange={(e) => setYourTitle(e.target.value)} />
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" id="phone" value={HourlyRate} placeholder='Hoyrly Rate' onChange={(e) => setHourlyRate(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              <button type="button" className="btn btn-primary" >Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
