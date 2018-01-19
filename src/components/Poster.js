import React from 'react';
import Button from './Button';
import Modal from 'react-modal';
import './style/Poster.css';
import ToggleButton from "./ToggleButton";

class Poster extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const voteButton = !this.props.voteLimit ?
      <Button btnClass='btn-flat' label='Vote' handleClick={() => {this.props.voteForPoster(this.props.index)}}/> :
      <Button btnClass='btn-flat disabled' disabled='true' label='Vote'/>;

    const total = this.props.details.votes ?
      <p>Total Votes: {Object.keys(this.props.details.votes).reduce((prev, curr) => prev + 1, 0)}</p> :
      null;

    const customStyles = {
      overlay: {
        backgroundColor    : 'rgba(0,0,0,0.4)'
      },
      content : {
        border             : 'none',
        overflowX          : 'hidden',
        borderRadius       : '0'
      }
    };

    return (
      <li className="movie-poster">
        <h2>{this.props.details.title}</h2>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel={this.props.details.title}
          appElement={document.getElementsByClassName('App')[0]}>
          <div className="modal-wrap">
            <ToggleButton btnClass="toggle" handleClick={this.closeModal}/>
            <img src={this.props.details.image} alt={`${this.props.details.title} movie poster`}/>
          </div>
        </Modal>

        <img src={this.props.details.image} alt={`${this.props.details.title} movie poster`} onClick={this.openModal}/>
        {voteButton}
        {total}
      </li>
    );
  }
}

export default Poster;
