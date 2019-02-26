import React, { Component } from 'react';
import classnames from 'classnames';
import './Label.css';

class Label extends Component {

  render () {
    return (
      <div className="Label-container">
        <label className="Label">
          <span className={
            classnames("Label__text", {
              'Label__text--disabled': this.props.disabled 
            })}
          >
            {this.props.text}
          </span>
          { this.props.children }
        </label>
      </div>
    )
  }
}
export default Label;