
import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './Auth/home/Navbar';
import SignIn from './Auth/sign in/SignIn';
import Home from './Auth/home/Home';
import Choose from './Auth/client or freelancer/Choose';
import ClientSignUp from './Auth/client sign up/ClientSignUp';
import FreelanceSignUp from './Auth/freelancer sign up/FreelanceSignUp';
import Done from './Auth/done Registration/Done';
import ReconfirmEmail from './Auth/ReconfirmEmail';
import Forget from './Auth/forget Password/Forget';
import Congratulation from './Auth/confirm Email/Congratulation';
import ResetPassword from './Auth/resetPassword/ResetPassword';
import UserAccount from './accounts/UserAccount';
import FreelancerAccount from './accounts/FreelancerAccount';
import Error404 from './errorPages/Error404';
import Error403 from './errorPages/Error403';

import Error401 from './errorPages/Error401';
import Error500 from './errorPages/Error500';
import Select from './components/Select';
import SelectImage from './components/SelectImage';
import RequireAuth from './Auth/RequireAuth';
import Heart from './components/Heart';
import JobPostsPage from './JobPost/JobPostsPage';
import ProfileFree from './ProfileFreelancer/ProfileFree';
import JobPostPage from './JobPost/JobPostPage';
import FreelancersPage from './ProfileFreelancer/FreelancersPage';
import NoUserFound from './ProfileFreelancer/NoUserFound';


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
      <Route path='reconfirm-email' element={<ReconfirmEmail />}/>

      <Route element={<RequireAuth/>}>
        <Route path='account-user' element={<UserAccount/>}/>
        <Route path='account-freelancer' element={<FreelancerAccount/>}/>
      </Route>

      <Route path='freelancers' element={<FreelancersPage />}/>
      <Route path='freelancers/Profile/:id' element={<ProfileFree />}/> 
      <Route path='jobpost' element={<JobPostPage />}/>
      <Route path='error404' element={<Error404 />}/>
      <Route path='error403' element={<Error403 />}/>
      <Route path='error401' element={<Error401 />}/>
      <Route path='error500' element={<Error500 />}/>
      <Route path='select' element={<Select />}/>
      <Route path='selectimage' element={<SelectImage />}/>
      <Route path='heart' element={<Heart />}/>
      <Route path='nouser' element={<NoUserFound />}/>
    </Routes>
    </div>
  );
}

export default App;
