import React, { Component } from 'react';
import Label from '../Label/Label';
import './Input.css';

class Input extends Component {

  render () {
    return (
      <Label text={this.props.label} disabled={this.props.disabled}>
        <input 
          className="Input"
          required={this.props.required}
          type={this.props.type} 
          onChange={(event) => this.props.onChange(event.target.value)} disabled={this.props.disabled}
        />
      </Label>
    )
  }
}
export default Input;