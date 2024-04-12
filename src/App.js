
import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './Auth/home/Navbar';
import SignIn from './Auth/sign in/SignIn';
import Home from './Auth/home/Home';
import Choose from './Auth/client or freelancer/Choose';
import ClientSignUp from './Auth/client sign up/ClientSignUp';
import FreelanceSignUp from './Auth/freelancer sign up/FreelanceSignUp';
import Done from './Auth/done Registration/Done';
import Forget from './Auth/forget Password/Forget';
import Congratulation from './Auth/confirm Email/Congratulation';
import FreelancerProfile from './accounts/freelancerProfile/FreelancerProfile';
import Account from './accounts/account info/Account';
import ConfirmPass from './accounts/confirmed password/ConfirmPass';
import ResetPassword from './Auth/resetPassword/ResetPassword';
import Error404 from './errorPages/Error404';
import Error403 from './errorPages/Error403';
import ProfileFree from './accounts/ProfileFreelancer.js/ProfileFree';


function App() {
  return (
    <div className="App">
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='signin' element={<SignIn />}/>
      <Route path='forgetPassword' element={<Forget />}/>
      <Route path="resetPassword" element={<ResetPassword />} />
      <Route path='clientOrfreelance' element={<Choose />}/>
      <Route path='clientSignup' element={<ClientSignUp />}/>
      <Route path='freelanceSignUp' element={<FreelanceSignUp />}/>
      <Route path='registrationDone' element={<Done />}/>
      <Route path='congratulation' element={<Congratulation />}/>
      <Route path='profile' element={<FreelancerProfile />}/> 
      <Route path='profileF' element={<ProfileFree />}/> 
      <Route path='account' element={<Account />}/>
      <Route path='confpass' element={<ConfirmPass />}/>
      <Route path='error404' element={<Error404 />}/>
      <Route path='error403' element={<Error403 />}/>
    </Routes>
    </div>
  );
}

export default App;
