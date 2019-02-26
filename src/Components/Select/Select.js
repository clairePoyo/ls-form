import React, { Component } from 'react';
import Label from '../Label/Label';
import './Select.css';

class Select extends Component {

  computeOptions = (options) =>  {
    return options.map((option, index) => {
      return <option key={index + option} value={option}>{option}</option>
    })
  }

  render () {
    return (
      <Label text={this.props.label} disabled={this.props.disabled}>
        <div className="Select-container">
          <select 
            className="Select"
            required={this.props.required}
            type={this.props.type} 
            onChange={(event) => this.props.onChange(event.target.value)}
            >
            <option value={undefined}></option>
            { this.props.options ? this.computeOptions(this.props.options) : ''}
          </select>
        </div>
      </Label>
    )
  }
}
export default Select;