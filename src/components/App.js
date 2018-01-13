import React, { Component } from 'react';

import logo from '../images/camera-diaphragm.svg';
import './App.css';
import Poster from './Poster';
import samplePosters from '../sampleposters';
import base from '../base';
import { countItemsValues } from '../helpers';

class App extends Component {

  constructor() {
    super();
    this.voteForPoster = this.voteForPoster.bind(this);
    this.loadDefault = this.loadDefault.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      posters: {},
      user: {}
    };
  }

  componentWillMount() {
    this.ref = base.syncState(`posters`, {
      context: this,
      state: 'posters'
    });
    this.ref = base.syncState(`users`, {
      context: this,
      state: 'user'
    });
  }

  // componentWillReceiveProps(nextProps ) {
  //   // @TODO the user or voting button should be it's own component so that I can pass it props and this trigger componentWillReceiveProps
  //   // The App maybe never hits this method
  //   console.log(nextProps)
  //   // const user = this.state.user || {};
  //   // const voteCount = countTotalUserVotes(this.state.posters, user.uid);
  //   // if (voteCount > 2) {
  //   //   this.setState({
  //   //     voteLimit: true
  //   //   })
  //   // }
  // }

  loadDefault() {
    this.setState({
      posters: samplePosters
    })
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Log in</h2>
        <p>Sign in to vote for your favorite Movie Posters.</p>
        <button className="google" onClick={() => this.authenticate('google')} >Login in with Google</button>
      </nav>
    )
  }

  authenticate(provider) {
    console.log('Trying to log in with ' + provider);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {
    if (err) {
      console.log(err);
      return;
    }
    this.setState({
      user: {uid: authData.user.uid}
    });
  }

  logout() {
    base.unauth();
    this.setState({
      user: null
    });
  }

  voteForPoster(key) {
    const posters = {...this.state.posters};
    const timestamp = Date.now();
    const user = {...this.state.user};

    if (posters[key].hasOwnProperty('votes')) {
        posters[key]['votes'][`${timestamp}`] = user.uid;
    }
    else {
      posters[key]['votes'] = {[`${timestamp}`]: user.uid};
    }

    this.setState({ posters })
  }

  // addAllVotes(voteCount) {
  //   // const user = {...this.state.user};
  //   // user.voteCount = this.state.user.vountCount ? this.state.user.vountCount + voteCount : voteCount;
  //   // // this.state.user.voteCount = this.state.user.vountCount ? this.state.user.vountCount + voteCount : voteCount;
  //   // this.setState({ user })
  // }

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;
    // if (Object.keys(this.state.posters).length !== 0 && this.state.posters.constructor === Object) {
    //   console.log(this.state.posters)
    //
    // }
    // Prompt login
    if(!this.state.user) {
      return <div>{this.renderLogin()}</div>
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Movie Posters Voting</h1>
          <p>Vote three times for your favorite movie posters for the dev room.</p>
          {logout}
          <button onClick={()=>this.loadDefault()}>Load Default Posters</button>
        </header>
        <ul className="movie-posters">
          {
            Object
            .keys(this.state.posters)
            .map(key =>
              <Poster
                key={key}
                index={key}
                user={this.state.user}
                details={this.state.posters[key]}
                voteForPoster={this.voteForPoster}
              />)
          }
        </ul>
      </div>
    );
  }
}

export default App;

// const userVoteTotal = Object.keys(this.state.posters).reduce((prev, curr) => {
//   if (this.state.user) {
//     const votes = countItemsValues(this.state.posters[curr].votes, this.state.user.uid);
//     console.log(votes);
//     return prev + votes;
//   }
// }, 0);
// console.log(userVoteTotal);
