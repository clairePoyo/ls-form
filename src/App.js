import React, { Component } from 'react';
import Input from './Components/Input/Input'
import Select from './Components/Select/Select'
import classnames from 'classnames';
import './App.css';

const COUNTRIES = [
  'France',
  'Brazil'
];

const USER_COUNTRY_REGEXS = {
  France: /[0-9CFGHJKLMNPRTVWXYZ]{9}$/gy,
  Brazil: /^[CFGHJKLMNPRTVWXYZ]{2}([0-9]{6})$/gy
};

const TITLES = [
  'Mr',
  'Mrs'
];

const REQUIRED_VALUES = [
  'userCountry',
  'userTitle',
  'email',
  'firstName',
  'lastName',
  'passportId'
]

class App extends Component {
  constructor(props) {
    super(props);
    this.formEl = React.createRef();
  }

  state = {
    userCountry: undefined,
    userTitle: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    passportId: undefined,
    isValid: false,
    errors: [],
    showErrors: false
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.isValid) {
      this.setState({
        showErrors: true
      })
      return;
    }
  
    this.formEl.current.reset();
    this.setState({
      userCountry: undefined,
      userTitle: undefined,
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      passportId: undefined,
      isValid: false,
      errors: [],
      showErrors: false
    })
  }

  checkPassportIdValidity = (value = this.state.passportId) => {
    const regex = USER_COUNTRY_REGEXS[this.state.userCountry];
    if (!regex) {
      return true;
    }
    return value && value.match(regex);
  }

  checkFormCompletion = () => REQUIRED_VALUES.every((key) =>  
    this.state.hasOwnProperty(key)
    && typeof this.state[key] !== 'undefined'
    && this.state[key] !== ''
  )

  checkValidity = (stateDiff = {}) => {
    let isValid = true;
    const errors = [];
    if (!this.checkPassportIdValidity(stateDiff.passportId)) {
      isValid = false;
      errors.push('Valid passport ID required');
    }
    if (!this.checkFormCompletion()) {
      isValid = false;
      errors.push('Required fields missing')
    }
    this.setState({
      isValid,
      errors
    });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.userCountry !== prevState.userCountry) {
      this.checkValidity();
    }
  }
  
  onChange = (prop) => (value) => {
    const stateDiff = { [prop]: value };
    this.setState(stateDiff);
    this.checkValidity(stateDiff);
  }

  isRequired = key => REQUIRED_VALUES.indexOf(key) > -1

  renderErrors = () => {
    return (
      <ul className="Errors">
        { this.state.errors.map((error) => 
          <li key={error}>{error}</li>)
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="Form-container">
        <h1 className="title">Yolaw!</h1>
        <form 
          className="Form"
          onSubmit={(e) => this.handleSubmit(e)} 
          ref={this.formEl}
        >
          {
            this.state.errors && this.state.errors.length && this.state.showErrors ? this.renderErrors() : undefined
          }
          <div className="Form__fields">
            <Select
              required={this.isRequired('userTitle')}
              label="Title" 
              options={TITLES} 
              onChange={this.onChange('userTitle')}
            />
            <Input
              required={this.isRequired('firstName')}
              type="text" 
              label="First name" 
              onChange={this.onChange('firstName')}
            />
            <Input
              required={this.isRequired('lastName')}
              type="text" 
              label="Last name" 
              onChange={this.onChange('lastName')}
            />
            <Select
              required={this.isRequired('userCountry')}
              label="Country of citizenship" 
              options={COUNTRIES} 
              onChange={this.onChange('userCountry')}
            />
            <Input
              required={this.isRequired('passportId')}
              type="text" 
              label="Passport ID" 
              onChange={this.onChange('passportId')} 
              disabled={!this.state.userCountry}
              value={this.state.passportId}
            />
            <Input
              required={this.isRequired('email')}
              type="email" 
              label="Email" 
              onChange={this.onChange('email')}
            />
          </div>
          <button 
            type="submit" 
            className={classnames('button-submit', {
              'button-submit--disabled': !this.state.isValid
            })}
          >
            Submit
          </button>
        </form>
        
      </div>
    );
  }
}

export default App;