import React from "react";
import logo from '../images/camera-diaphragm.svg';
import Button from './Button';

class Login extends React.Component {

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav className="login">
          <h2>Log in</h2>
          <p>Sign in to vote for your favorite Movie Posters.</p>
          <Button btnClass="google" handleClick={() => {this.props.authenticate('google')}} label="Log in with Google"/>
        </nav>
        <div className="header-info">
          <h1 className="App-title">Movie Posters Voting</h1>
          <p>Vote for your favorite movie posters for the dev room.</p>
        </div>
      </header>
      </div>
    )
  }
}

export default Login;