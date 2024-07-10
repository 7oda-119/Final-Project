
import { Route, Routes } from 'react-router';
import './App.css';
import Navbar from './home/Navbar';
import SignIn from './Auth/sign in/SignIn';
import Home from './home/Home';
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
import RequireAuth from './Auth/RequireAuth';
import AllJobPosts from './JobPost/AllJobPosts';
import ProfileFree from './FindFreelancer/ProfileFree';
import FreelancersPage from './FindFreelancer/FreelancersPage';
import CreateJob from './JobPost/CreateJobPost';
import MyJobs from './JobPost/MyJobPosts';
import ContractDetails from './Contract/ContractDetails';
import CreateContract from './Contract/CreateContract';
import CategoriesList from './Admin/CategoriesList';
import SkillList from './Admin/SkillList';
import LanguageList from './Admin/LanguageList';
import EditJobPost from './JobPost/EditJobPost';
import Sidebar from './home/Sidebar';

import Cookie from 'cookie-universal'
import MyFavJobs from './Favorites/MyFavJobs';
import FavFreelancers from './Favorites/FavFreelancers';
import JobDetails from './Favorites/JobDetails';
import FreeAppliedTasks from './Apply Tasks/FreeAppliedTasks';
import EditInfoFreelancer from './accounts/information/EditInfoFreelancer';
import JobApplicants from './Apply Tasks/JobApplicants';
import FreeAcceptedForTasks from './Apply Tasks/FreeAcceptesTasks';
import ClientAcceptedFrees from './Apply Tasks/ClientAcceptFree';
import AllContracts from './Contract/AllContracts';
import Payment from './Payment/Payment';
import ManagePay from './Admin/ManagePay';
import ChatAI from './AI/ChatAI';
import RatingAndFeedbackForm from './Rating/SetRating';
function App() {
  
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie')
  return (
    <div className="App">
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'row', width: token ? '' : '100%' }} >
        {token && <div style={{ flexBasis: '20%' }}>
          <Sidebar />
        </div>}
        <div style={{ flexBasis: token ? '90%' : '100%' }}>
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
              <Route path='edit-freelancer' element={<EditInfoFreelancer/>}/>
              <Route path='findwork' element={<AllJobPosts />}/>
              <Route path='favjobs' element={<MyFavJobs />}/>
              <Route path='favfreelancers' element={<FavFreelancers />}/>
              <Route path='jobDeatais' element={<JobDetails />}/>

              <Route path='freelancers' element={<FreelancersPage />}/>
              <Route path='freelancers/Profile/:id' element={<ProfileFree />}/> 
              <Route path='createjob' element={<CreateJob />}/>
              <Route path='myjobs' element={<MyJobs />}/>
              <Route path='myjobs/editjob/:id' element={<EditJobPost />}/>

              <Route path='appliedTasks' element={<FreeAppliedTasks />}/>
              <Route path='acceptedApplicantsFree' element={<FreeAcceptedForTasks />}/>
              <Route path='acceptedApplicantsClient' element={<ClientAcceptedFrees />}/>
              <Route path='myjobs/applicants/:jobId' element={<JobApplicants />}/>

              <Route path='all-contracts' element={<AllContracts />}/>
              <Route path='ContractDetails/:id' element={<ContractDetails />}/>
              <Route path='create-contract/:FreelancerId/:JopPostId' element={<CreateContract />}/>
              
              <Route path='payment/:freelancerId/:jobPostId/:price' element={<Payment />}/>
              <Route path='rating/:freelancerId' element={<RatingAndFeedbackForm />}/>

              <Route path='categories' element={<CategoriesList />}/>
              <Route path='skills' element={<SkillList />}/>
              <Route path='Languages' element={<LanguageList />}/>
              <Route path='manage-pay' element={<ManagePay />}/>

              <Route path='gpt' element={<ChatAI />}/>
            </Route>

            <Route path='error403' element={<Error403 />}/>
            <Route path='error401' element={<Error401 />}/>
            <Route path='error500' element={<Error500 />}/>
            <Route path='*' element={<Error404 />}/>

          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;
