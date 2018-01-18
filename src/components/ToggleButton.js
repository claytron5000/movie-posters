import React from 'react';
import './style/Button.css';
class ToggleButton extends React.Component {

  render() {
    const disabled = this.props.disabled ? -1 : '';
    return (
      <button
        tabIndex={disabled}
        className={`btn ${this.props.btnClass}`}
        onClick={this.props.handleClick}><span className="toggle-icon">toggle</span></button>
    );
  }
}

export default ToggleButton;