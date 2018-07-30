import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import ErrorBox from './shared/ErrorBoxContainer'
import HeaderContainer from './shared/HeaderContainer';
import Blocks from './Blocks/Blocks';
import LoginPage from  './account/LoginPageContainer.jsx'

export default function Template(props) {

  return (
    <Router>
      <div className="wrapper">
        <HeaderContainer />
        <section className="page-content container-fluid">
          <div className="loader-wrapper" style={0 > 0 ? { display: 'block' } : { display: 'none' }}>
          <div className="loader-box">
              <div className="loader">Loading...</div>
            </div>
          </div>
          <Route exact path="/account/login" component={LoginPage} />
          <Route exact path="/" component={Blocks} />
        </section>
      </div>
    </Router>
  );
}
