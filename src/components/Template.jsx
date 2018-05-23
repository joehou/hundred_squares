import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import ErrorBox from './shared/ErrorBoxContainer'
//import HeaderContainer from './shared/HeaderContainer';
import Blocks from './Blocks/Blocks';


export default function Template(props) {

  return (
    <Router>
      <div className="wrapper">
        <section className="page-content container-fluid">
          <div className="loader-wrapper" style={0 > 0 ? { display: 'block' } : { display: 'none' }}>
          <div className="loader-box">
              <div className="loader">Loading...</div>
            </div>
          </div>
          <Route exact path="/" component={Blocks} />
        </section>
      </div>
    </Router>
  );
}
