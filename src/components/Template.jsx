import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ErrorBox from './shared/ErrorBoxContainer'
import HeaderContainer from './shared/HeaderContainer';
import Blocks from './blocks/Blocks';
import LoginPage from  './account/LoginPageContainer.jsx'
import HomePage from './homepage/HomePageContainer'
import Dash from './dash/DashContainer'

export default function Template(props) {

  const { authentication } = props

  return (
    <Router>
      <div className="wrapper">
        <HeaderContainer authentication = {authentication}  />
        <section className="page-content container-fluid">
          <ErrorBox />
          <div className="loader-wrapper" style={0 > 0 ? { display: 'block' } : { display: 'none' }}>
          <div className="loader-box">
              <div className="loader">Loading...</div>
            </div>
          </div>
          <Route exact path="/account/login" component={LoginPage} />
          <Route exact path="/" render={(props) => <HomePage {...props} authentication={authentication}/>} />
          <Route path="/dash" render={(props) => <Dash {...props} authentication={authentication}/>} />
        </section>
      </div>
    </Router>
  );
}
