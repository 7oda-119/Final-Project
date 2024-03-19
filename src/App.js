
import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/home/Navbar';
import SignIn from './components/sign in/SignIn';
import Home from './components/home/Home';
import Choose from './components/client or freelancer/Choose';
import ClientSignUp from './components/client sign up/ClientSignUp';
import FreelanceSignUp from './components/freelancer sign up/FreelanceSignUp';
import Done from './components/done Registration/Done';
import Forget from './components/forget Password/Forget';
import Congratulation from './components/confirm Email/Congratulation';
import FreelancerProfile from './components/freelancerProfile/FreelancerProfile';
import Account from './accounts/account info/Account';
import ConfirmPass from './accounts/confirmed password/ConfirmPass';
import ResetPassword from './components/resetPassword/ResetPassword';


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
      <Route path='account' element={<Account />}/>
      <Route path='confpass' element={<ConfirmPass />}/>
    </Routes>
    </div>
  );
}

export default App;
