import React from 'react';

class Form extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.createPoster = this.createPoster.bind(this);
    this.state = {
      isClosed: true
    }
  }

  createPoster(event) {
    event.preventDefault();
    console.log(this.title);
    const poster = {
      title: this.title.value,
      image: this.image.value
    }
    this.props.addNewPoster(poster);
  }

  toggle() {
    this.setState({
      isClosed: !this.state.isClosed
    })
  }

  render() {
    const toggle = this.state.isClosed ? "closed" : "open";
    return (
      <div className={`add-poster ${toggle}`}>
        <button className="toggle btn" onClick={()=>this.toggle()}><span className="toggle-icon"></span></button>
        <form ref={(input) => this.posterForm = input} onSubmit={(e) => this.createPoster(e)}>
          <label htmlFor="title">Movie Title</label>
          <input ref={input => this.title = input} type="text" id="title" />
          <label htmlFor="image">Link to Image</label>
          <input ref={input => this.image = input} type="text" id="image" />
          {/* <label for="link">Link to purchase</label>
          <input type="text" name="link" /> */}
          <button type="submit" className="submit btn">Add Poster</button>
        </form>
      </div>
    )
  }
}

export default Form;
