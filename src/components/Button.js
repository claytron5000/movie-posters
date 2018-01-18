import React from 'react';
import './style/Button.css';
class Button extends React.Component {

  render() {
    const disabled = this.props.disabled ? -1 : '';
    return (
      <button
        tabIndex={disabled}
        className={`btn ${this.props.btnClass}`}
        onClick={this.props.handleClick}>{this.props.label}</button>
    );
  }
}

export default Button;