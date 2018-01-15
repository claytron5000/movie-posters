import React from 'react';
import { countItemsValues } from '../helpers';

class Poster extends React.Component {

  render() {
    const voteButton = true ? //!this.props.voteLimit ?
      <button href="#" className="btn-flat" onClick={()=>{this.props.voteForPoster(this.props.index)}}>Vote</button> :
      null;

    const total = this.props.details.votes ?
      <p>Total Votes: {Object.keys(this.props.details.votes).reduce((prev, curr) => prev + 1, 0)}</p> :
      null;

    return (
      <li className="movie-poster">
        <h2>{this.props.details.title}</h2>
        <img src={this.props.details.image} alt={`${this.props.details.title} movie poster`}/>
        {voteButton}
        {total}
      </li>
    );
  }
}

export default Poster;
