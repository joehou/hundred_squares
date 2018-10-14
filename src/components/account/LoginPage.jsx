import React,{Component} from 'react'
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';


export default class LoginPage extends Component {
  constructor(props){
    super(props)
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    //    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }


  // update state as email value changes
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  // update state as password value changes
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  // Handle submission once all form data is valid
  handleValidSubmit() {
    const { loginFunction } = this.props;
    const formData = this.state;
    console.log('hi')
    loginFunction(formData);
  }

  render() {
    return(
      <div className="row justify-content-center">
        <div id="login-form" className="col-10 col-sm-7 col-md-5 col-lg-4">
          <AvForm onValidSubmit={this.handleValidSubmit}>
            <AvGroup>
                <Label for="exampleEmail">Email</Label>
                <AvInput
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  placeholder="noreply@musiclist.com"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  onKeyPress={this.handleKeyPress}
                />
              <AvFeedback>A valid email is required to log in.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="userPassword">Password</Label>
              <AvInput
                id="userPassword"
                name="userPassword"
                onChange={this.handlePasswordChange}
                onKeyPress={this.handleKeyPress}
                placeholder="password"
                required
                type="password"
                value={this.state.password}
              />
              <AvFeedback>Password is required to log in</AvFeedback>
              <span><Link to="/account/reset-password">Forgot your password?</Link></span>
            </AvGroup>
            <Button name="login" color="primary">Log In</Button>
          </AvForm>
        </div>
      </div>
    )
  }
}
