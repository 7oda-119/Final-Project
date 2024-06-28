import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookie from 'cookie-universal'
import axios from 'axios';
import { baseUrl } from '../Api/Api';
import moment from 'moment';
function ManagePay() {
    const [pay, setPay] = useState([
      {id:1, freelancerName:'Mahmoud', clientName:'Ali', payment:40, date:'20/09/2020'},
      {id:1, freelancerName:'Mahmoud', clientName:'Ali', payment:40, date:'20/09/2020'},
      {id:1, freelancerName:'Mahmoud', clientName:'Ali', payment:40, date:'20/09/2020'}
    ]);

  const navigate = useNavigate();

  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')
  useEffect(() => {
    
    fetchData();
  }, []);
    // Fetch data from an API or other data source
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/PaymentTest/Get-All-Payments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPay(response.data)
        console.log(response.data);
        
      } catch (error) {
        const errorPages = error.response.status;
          if (errorPages === 403) {
            navigate('/error403');
          } else if (errorPages === 401) {
            navigate('/error401');
          } else if (errorPages === 500) {
            navigate('/error500');
          } else{
            console.log(error.response)
          }
      }
      
    };

  return (
    <div className='text-center' style={{minHeight:'87vh'}}>
      <h4 className='mt-4'>Payment details</h4>
      <div className='d-flex justify-content-center mt-3' >
        <div className='row col-9 ' >
            <table className="table table-striped table-bordered table-hover text-center">
                <thead className="thead-dark">
                    <tr>
                    <th></th>
                    <th>Client Name</th>
                    <th>Freelancer Name</th>
                    <th>Payment</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {pay.map((item, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.clientId}</td>
                        <td>{item.freelancerId}</td>
                        <td>$ {item.price}</td>
                        <td>{`${moment(item.payTime).format('DD-MM-YYYY')} - ${moment(item.payTime).format('HH-MM-SS')}`}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default ManagePay