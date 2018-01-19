import React, { Component } from 'react';

import logo from '../images/camera-diaphragm.svg';
import './style/App.css';
import Poster from './Poster';
import samplePosters from '../sampleposters';
import base from '../base';
import { extractVotes } from '../helpers';
import Form from './Form';
import User from './User';

class App extends Component {

  constructor() {
    super();
    this.voteForPoster = this.voteForPoster.bind(this);
    this.loadDefault = this.loadDefault.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.addNewPoster = this.addNewPoster.bind(this);

    this.state = {
      posters: {}
    };
  }

  componentWillMount() {
    this.ref = base.syncState(`posters`, {
      context: this,
      state: 'posters'
    });
    const userKey = Object.keys(window.localStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0];
    const user = userKey ? JSON.parse(localStorage.getItem(userKey)) : false;
    console.log(user);
    if (user) {
      this.ref = base.syncState(`users/${user.uid}`, {
        context: this,
        state: 'user'
      });
    }

  }

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
    const displayName = authData.user.displayName;
    const uid = authData.user.uid;
    const voteCount = extractVotes(uid, this.state.posters).length;

    this.setState({
      user:
      {
        uid: uid,
        displayName: displayName,
        voteCount: voteCount
      }
    });
  }

  logout() {
    base.unauth();
    // This bug I cannot figure out.
    this.setState({
      user: null
    });
    // this.setState({
    //   users: null
    // });
  }

  voteForPoster(key) {
    const posters = {...this.state.posters};
    const timestamp = Date.now();
    const votingUser = this.state.user;

    if (posters[key].hasOwnProperty('votes')) {
        posters[key]['votes'][`${timestamp}`] = votingUser.uid;
    }
    else {
      posters[key]['votes'] = {[`${timestamp}`]: votingUser.uid};
    }
    // Count number of votes by uid.
    const voteCount = votingUser.voteCount || 0;
    if (voteCount > 5) {
      return;
    }
    else {
      votingUser.voteCount = voteCount + 1;
    }

    const user = votingUser;
    console.log(user);
    // This tells me I should start using redux or other state managment lib
    this.setState({ user });
    this.setState({ posters })
  }

  addNewPoster(poster) {
    const posters = {...this.state.posters};
    const timestamp = Date.now();
    posters[`poster-${timestamp}`] = poster;
    this.setState({ posters });
  }

  render() {
    // Prompt login
    if(!this.state.user || Object.keys(this.state.user).length === 0) {
      return <div>{this.renderLogin()}</div>
    }

    const user = this.state.user;
    const voteLimit = user.voteCount >= 5;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <User user={user} logout={this.logout}/>
          <div className="header-info">
            <h1 className="App-title">Movie Posters Voting</h1>
            <p>Vote for your favorite movie posters for the dev room.</p>
          </div>
        </header>
        <ul className="movie-posters">
          {
            Object
            .keys(this.state.posters)
            .map(key =>
              <Poster
                key={key}
                index={key}
                details={this.state.posters[key]}
                voteForPoster={this.voteForPoster}
                voteLimit={voteLimit}
              />)
          }
        </ul>
        <Form addNewPoster={this.addNewPoster}/>
      </div>
    );
  }
}

export default App;
