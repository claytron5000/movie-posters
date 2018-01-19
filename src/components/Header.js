import React from 'react';
import logo from '../images/camera-diaphragm.svg';
import User from './User';
import Login from './Login';

class Header extends React.Component {

  render() {

    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <User user={this.props.user} logout={this.props.logout}/>
        <div className="header-info">
          <h1 className="App-title">Movie Posters Voting</h1>
          <p>Vote for your favorite movie posters for the dev room.</p>
        </div>
      </header>
    );
  }
}

export default Header;