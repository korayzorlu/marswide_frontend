import './App.css';
import React, {useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './features/layout/pages/Landing.js';
import Panel from './features/layout/pages/Panel.js';
import WrongPath from './features/layout/pages/WrongPath.js';
import Home from './features/layout/pages/Home.js';

import axios from 'axios';
import Loading from './component/loading/Loading.js';
import Settings from './features/settings/pages/Settings.js';
import Profile from './features/auth/pages/Profile.js'
import Auth from './features/auth/pages/Auth.js';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Company from './features/organization/pages/Companies.js';
import PasswordReset from './features/settings/auth/pages/PasswordReset.js';
import AuthSettingsLinks from './features/settings/auth/pages/AuthSettingsLinks.js';
import ProfileSettings from './features/settings/auth/pages/ProfileSettings.js';
import PersonalSettings from './features/settings/auth/pages/PersonalSettings.js';
import EmailSettings from './features/settings/auth/pages/EmailSettings.js';
import ForgotPassword from './features/auth/pages/ForgotPassword.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, fetchTheme, fetchCSRFToken, setLoading } from './store/slices/authSlice.js';
import { checkMobile, setResize } from './store/slices/sidebarSlice.js';
import AddCompany from './features/organization/pages/AddCompany.js';
import UpdateCompany from './features/organization/pages/UpdateCompany.js';
//import { ThemeProvider } from '@emotion/react'
import CariHesapHareketleri from './features/mikro/pages/CariHesapHareketleri.js';
import Personeller from './features/mikro/pages/Personeller.js';
import Partners from './features/partners/pages/Partners.js';
import { setNavigate } from './store/store.js';
import PersonelTahakkuklari from './features/mikro/pages/PersonelTahakkuklari.js';
import Notification from './features/notification/pages/Notification.js';
import Invitations from './features/organization/pages/Invitations.js';
import PhoneNumberSettings from './features/settings/auth/pages/PhoneNumberSettings.js';
import PhoneNumberVerify from './features/settings/auth/pages/PhoneNumberVerify.js';
import EmailVerify from './features/settings/auth/pages/EmailVerify.js';
import UpdatePartner from './features/partners/pages/UpdatePartner.js';
import AddPartner from './features/partners/pages/AddPartner.js';
import { ThemeProvider } from './ThemeProvider.js';
import Dashboard from './features/dashboard/pages/Dashboard.js';
import Accounts from './features/accounting/account/pages/Accounts.js';
import AddAccount from './features/accounting/account/pages/AddAccount.js';
import UpdateAccount from './features/accounting/account/pages/UpdateAccount.js';
import Invoices from './features/accounting/invoice/pages/Invoices.js';
import AddInvoice from './features/accounting/invoice/pages/AddInvoice.js';
import UpdateInvoice from './features/accounting/invoice/pages/UpdateInvoice.js';
import Payments from './features/accounting/payment/pages/Payments.js';
import AddPayment from './features/accounting/payment/pages/AddPayment.js';
import UpdatePayment from './features/accounting/payment/pages/UpdatePayment.js';

export const NumberContext = React.createContext();

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  const {user,status,theme,dark,loading} = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get user from api

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    //fetchTheme();
    dispatch(fetchTheme(theme));
  }, [dark,dispatch]);
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        await dispatch(fetchUser()).unwrap();
        await dispatch(fetchCSRFToken()).unwrap();
      }catch(error){}
      
      dispatch(setLoading(false));
    };
    
    fetchData();

  },[dispatch]);

  //sidebar collapse
  useEffect(() => {
    const handleResize = () => {
      dispatch(setResize());
    };

    dispatch(checkMobile());
    window.addEventListener('resize', handleResize);

    // Temizlik işlevi
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  if (loading) return <Loading></Loading>;

  if (user && !user.is_email_verified) return (
    <ThemeProvider>
      <EmailVerify></EmailVerify>
    </ThemeProvider>
  );

  return (
    <ThemeProvider>
        <div className="App" id='Marswide'>

          { user && status
          ? 
            <>
              <Routes>

                <Route exact path='/' element={<Panel></Panel>}>
                  <Route index element={<Dashboard></Dashboard>}></Route>
                  <Route path='profile/:username' element={<Profile></Profile>}></Route>
                  <Route path='notification' element={<Notification></Notification>}></Route>

                  <Route path='settings' element={<Settings></Settings>}>
                    <Route path='auth' element={<AuthSettingsLinks></AuthSettingsLinks>}></Route>
                    <Route path='auth/profile' element={<ProfileSettings></ProfileSettings>}></Route>
                    <Route path='auth/personal' element={<PersonalSettings></PersonalSettings>}></Route>
                    <Route path='auth/email' element={<EmailSettings></EmailSettings>}></Route>
                    <Route path='auth/phone-number' element={<PhoneNumberSettings></PhoneNumberSettings>}></Route>
                    <Route path='auth/password-reset' element={<PasswordReset></PasswordReset>}></Route>
                  </Route>
                  <Route path='phone-number-verify' element={<PhoneNumberVerify></PhoneNumberVerify>}></Route>

                  <Route path='/companies' element={<Company></Company>}></Route>
                  <Route path='/companies/add-company' element={<AddCompany></AddCompany>}></Route>
                  <Route path='/companies/update/:name' element={<UpdateCompany></UpdateCompany>}></Route>
                  <Route path='/invitations' element={<Invitations></Invitations>}></Route>

                  <Route path='/partners' element={<Partners></Partners>}></Route>
                  <Route path='/partners/add-partner' element={<AddPartner></AddPartner>}></Route>
                  <Route path='/partners/update/:uuid' element={<UpdatePartner></UpdatePartner>}></Route>

                  <Route path='/accounts' element={<Accounts></Accounts>}></Route>
                  <Route path='/accounts/add-account/:type' element={<AddAccount></AddAccount>}></Route>
                  <Route path='/accounts/update/:type/:uuid' element={<UpdateAccount></UpdateAccount>}></Route>

                  <Route path='/invoices' element={<Invoices></Invoices>}></Route>
                  <Route path='/invoices/add-invoice/:type' element={<AddInvoice></AddInvoice>}></Route>
                  <Route path='/invoices/update/:type/:uuid' element={<UpdateInvoice></UpdateInvoice>}></Route>

                  <Route path='/payments' element={<Payments></Payments>}></Route>
                  <Route path='/payments/add-payment/:type' element={<AddPayment></AddPayment>}></Route>
                  <Route path='/payments/update/:type/:uuid' element={<UpdatePayment></UpdatePayment>}></Route>

                  <Route path='/cari-hesap-hareketleri' element={<CariHesapHareketleri></CariHesapHareketleri>}></Route>
                  <Route path='/personeller' element={<Personeller></Personeller>}></Route>
                  <Route path='/personel_tahakkuklari' element={<PersonelTahakkuklari></PersonelTahakkuklari>}></Route>

                  <Route path='auth' element={<Dashboard></Dashboard>}>
                    <Route path='login'></Route>
                    <Route path='register'></Route>
                  </Route>

                </Route>

                <Route path='*' element={<WrongPath></WrongPath>}></Route>

              </Routes>
            </>
          :
            <>
              <Routes>

                <Route path='/' element={<Landing></Landing>}>
                  <Route index element={<Home></Home>}></Route>
                  <Route path='auth' element={<Auth></Auth>}>
                    <Route path='login' element={<Login></Login>}></Route>
                    <Route path='register' element={<Register></Register>}></Route>
                    <Route path='forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
                  </Route>
                </Route>

                <Route path='*' element={<WrongPath></WrongPath>}></Route>

              </Routes>
            </>
          }

        </div>
      
    </ThemeProvider>
    
  );
}

export default App;
