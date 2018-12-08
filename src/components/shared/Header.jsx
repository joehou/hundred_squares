import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const renderLogin = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink tag={Link} to="/account/login">Log In</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/account/register">Register</NavLink>
    </NavItem>
  </Nav>
);

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this)

    this.state = {
      isOpen: false,
    };
  }


  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  renderGreeting(name) {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <span className="nav-link welcome">Welcome, {name}
           | <a href="/logout" onClick={this.logOutClick}>Log Out</a>
          </span>
        </NavItem>
      </Nav>
    );
  }

  render() {
    const {isLoggedIn,firstName} = this.props.authentication
    return (
      <header className="wrapper">
        <Navbar color="faded" light toggleable>
          <NavbarBrand tag={Link} to="/">Hundred Blocks</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/albums">My Squares</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/artists">Artists</NavLink>
              </NavItem>
              <NavItem>
                {!isLoggedIn? <NavLink id='login-link' tag={Link} to="/account/login">Log In</NavLink> :this.renderGreeting(firstName)}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
