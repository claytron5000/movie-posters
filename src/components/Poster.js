import React from 'react';
import { countItemsValues } from '../helpers';

class Poster extends React.Component {

  // componentWillReceiveProps(nextProps) {
  //   const voteCount = countItemsValues(nextProps.details.votes, this.props.user.uid);
  //   // console.log(voteCount)
  //   // this.
  //   // this.props.addAllVotes(voteCount);
  // }

  render() {
    // const button = '';
    console.log(this.props.voteLimit);
    const voteButton = !this.props.voteLimit ?
      <button className="button" onClick={()=>{this.props.voteForPoster(this.props.index)}}>Vote for this Poster</button> :
      null;

    const total = this.props.details.votes && this.props.voteLimit ?
      <p>Total Votes: {Object.keys(this.props.details.votes).reduce((prev, curr) => prev + 1, 0)}</p> :
      null;
    // if (this.props.details. < 4) {
    //   const button = <button className="button" onClick={()=>{this.props.voteForPoster(this.props.index)}}>Vote for this Poster</button>
    // }
    return (
    <li className="movie-poster">
      <h2>{this.props.details.name}</h2>
      <img src={this.props.details.image} alt='poster'/>
      {voteButton}
      {total}
    </li>);
  }
}

export default Poster;
