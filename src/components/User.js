import  React from 'react';

class User extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className="userCard">
        <p>Welcome, {this.props.user.displayName}</p>
      </div>
    );
  }
}

export default User;
