import React from 'react';
import Button from './Button';
import ToggleButton from './ToggleButton';
import './style/Form.css';

class Form extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.createPoster = this.createPoster.bind(this);
    this.state = {
      isClosed: false
    }
  }

  createPoster(event) {
    event.preventDefault();
    const poster = {
      title: this.title.value,
      image: this.image.value
    };
    this.props.addNewPoster(poster);
    this.posterForm.reset();
  }

  toggle() {
    console.log('asdfasdfa');
    this.setState({
      isClosed: !this.state.isClosed
    })
  }

  render() {
    const toggle = !this.state.isClosed ? "open" : "closed";
    return (
      <div className={`add-poster ${toggle}`}>
        <ToggleButton btnClass="toggle" handleClick={this.toggle}/>
        <form ref={(input) => this.posterForm = input} onSubmit={(e) => this.createPoster(e)}>
          <Button btnClass="btn-raised" label="Add Poster"/>
          <div className="input-fam">
            <label htmlFor="title">Movie Title</label>
            <input ref={input => this.title = input} type="text" id="title" />
          </div>
          <div className="input-fam">
            <label htmlFor="image">Link to Image</label>
            <input ref={input => this.image = input} type="text" id="image" />
          </div>
          {/* <label for="link">Link to purchase</label>
          <input type="text" name="link" /> */}
        </form>
      </div>
    )
  }
}

export default Form;
