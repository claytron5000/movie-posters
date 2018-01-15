import React, { Component } from 'react';

import logo from '../images/camera-diaphragm.svg';
import './App.css';
import Poster from './Poster';
import samplePosters from '../sampleposters';
import base from '../base';
import { countItemsValues } from '../helpers';
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
    this.ref = base.syncState(`users`, {
      context: this,
      state: 'activeUser'
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
    console.log(authData.user);
    console.log(authData.user.displayName)
    const displayName = authData.user.displayName;
    const uid = authData.user.uid;
    this.setState({
      activeUser: {
        uid: uid,
        displayName: displayName
      }
    });
  }

  logout() {
    base.unauth();
    this.setState({
      activeUser: null
    });
    this.setState({
      activeUser: null
    });
  }

  voteForPoster(key) {
    const posters = {...this.state.posters};
    const timestamp = Date.now();
    const user = {...this.state.activeUser};

    if (posters[key].hasOwnProperty('votes')) {
        posters[key]['votes'][`${timestamp}`] = user.uid;
    }
    else {
      posters[key]['votes'] = {[`${timestamp}`]: user.uid};
    }

    this.setState({ posters })
  }

  addNewPoster(poster) {
    const posters = {...this.state.posters};
    const timestamp = Date.now();
    posters[`poster-${timestamp}`] = poster;
    this.setState({ posters });
  }

  render() {
    const posters = this.state.posters;
    const logout = <button className="btn" onClick={this.logout}>Log Out</button>;
    let voteLimit = false;
    // if (Object.keys(posters).length !== 0 && posters.constructor === Object) {
    //   // console.log(this.state.posters)
    //   const userVoteTotal = Object.keys(posters).reduce((prev, curr) => {
    //     if (typeof(posters[curr].votes) === 'undefined') {
    //       return prev;
    //     }
    //     const votes = posters[curr].votes;
    //     const matchingVotes = Object.keys(votes).filter((vote) => votes[vote] === this.state.user.uid);
    //     return prev + matchingVotes.length;
    //   }, 0);
    //   voteLimit = userVoteTotal > 2 ? true : false;
    // }

    // Prompt login
    if(!this.state.activeUser) {
      return <div>{this.renderLogin()}</div>
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Movie Posters Voting</h1>
          <p>Vote three times for your favorite movie posters for the dev room.</p>
          <User user={this.state.activeUser}/>
          {logout}
          <button className="btn" onClick={()=>this.loadDefault()}>Load Default Posters</button>
        </header>
        <ul className="movie-posters">
          {
            Object
            .keys(this.state.posters)
            .map(key =>
              <Poster
                key={key}
                index={key}
                user={this.state.activeUser}
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
