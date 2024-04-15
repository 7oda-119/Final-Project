import React from 'react'
import UserInformation from './information/UserInformation'
import ConfirmPass from './confirmed password/ConfirmPass'

export default function TestAcc() {
  return (
    <div style={{minHeight:'90vh'}}>
      <div className='d-flex justify-content-center row' >
          <nav className='d-flex justify-content-center'>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                  My Info
                </button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                  Password & Security
                </button>
            </div>
          </nav>
          <div className="tab-content d-flex justify-content-center" id="nav-tabContent">
            <div className="tab-pane fade show active col-5 " id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                <UserInformation />
            </div>
            <div className="tab-pane fade col-5" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                <ConfirmPass />
            </div>
          </div>
      </div>
    </div>
  )
}
