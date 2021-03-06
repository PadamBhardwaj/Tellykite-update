import './App.css';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/LoginPage/Login';
import Allreseller from "./components/Edit Reseller/allreseller"
import Allcustomer from "./components/Edit customer/allcustomer"
// import Form from './components/Forms/form'
import Loading from './components/Layout/Loading';
import { Admin } from './components/AdminHome/adminhome';
import { Reseller } from './components/ResellerHome/resellerhome';
import { Customer } from './components/CustomerHome/customerhome'
import { useDispatch, useSelector } from "react-redux"
import Dummycomponent from './components/Dummy/Dummycomponent';
import ProtectedRouteAdmin from "./components/ProtectdRoutes/adminprotectedroute"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ResellerCreate } from './components/Forms/ResellerCreate/resellerform';
import { CustomerCreate } from './components/Forms/customercreate/customercreate';
import { clearErrors, loadAdmin } from "./actions/adminaction";
import { loadReseller } from './actions/reselleraction';
import { loadCustomer } from './actions/customeraction';
import EditReseller from './components/Forms/edit reseller form/edirresellerfomr';
import EditCustomer from './components/Forms/edit customer/editcustomer';
import { ResellerProfile } from './components/Reseller Profile/resellerProfile';
import { CustomerProfile } from './components/Customer Profile/customerProfile';
import { ForgotPassword } from "./components/Forgot Password/ForgotPassword"
import ResetPassword from "./components/Forgot Password/ResetPassword"
function App({ history }) {
  const dispatch = useDispatch();
  const { admin, isAuthenticatedAdmin, loadingAdmin, role } = useSelector(state => state.admin);
  const { reseller, isAuthenticatedReseller, loadingReseller } = useSelector(state => state.reseller);
  const { customer, isAuthenticatedCustomer, loadingCustomer } = useSelector(state => state.customer);

  const errorAdmin = useSelector(state => state.admin.error);
  const errorReseller = useSelector(state => state.reseller.error);
  const errorCustomer = useSelector(state => state.customer.error);

  useEffect(() => {
    dispatch(loadAdmin());
    dispatch(loadReseller());
    dispatch(loadCustomer());
  }, [dispatch])


  return (
    <>

      <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/admin" component={(isAuthenticatedAdmin === true) && Admin} />
        <Route exact path='/reseller' component={(isAuthenticatedReseller === true) && Reseller} />
        <Route exact path='/resellerprofile' component={(isAuthenticatedReseller === true) && ResellerProfile} />
        <Route exact path='/customerprofile' component={(isAuthenticatedCustomer === true) && CustomerProfile} />
        <Route exact path='/customer' component={(isAuthenticatedCustomer === true) && Customer} />
        <Route exact path='/createreseller' component={(isAuthenticatedAdmin === true) && ResellerCreate} />
        <Route exact path='/createcustomer' component={(isAuthenticatedAdmin === true) && CustomerCreate} />
        <Route exact path='/editreseller' component={(isAuthenticatedAdmin === true) && Allreseller} />
        <Route exact path='/editresellerform/:id' component={(isAuthenticatedAdmin === true) && EditReseller} />
        <Route exact path='/editcustomer' component={(isAuthenticatedAdmin === true) && Allcustomer} />
        <Route exact path='/editcustomerform/:id' component={(isAuthenticatedAdmin === true) && EditCustomer} />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />
      </Switch>
      <ToastContainer />
    </>)
}

export default App;
