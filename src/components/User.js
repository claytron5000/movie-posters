import  React from 'react';
import Button from './Button';
import './style/User.css';

class User extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (!this.props.user) {
      return null;
    }
    const votesRemaining = this.props.user.voteCount ? 5 - this.props.user.voteCount : 5;
    return(
      <div className="userCard">
        <p>Welcome, <span>{this.props.user.displayName}</span></p>
        <Button btnClass='btn-flat' label='Log Out' handleClick={this.props.logout}/>
        <p>Votes Remaining: {votesRemaining}</p>
      </div>
    );
  }
}

export default User;
