import React from 'react';
import './Comment.css';
import axios from 'axios';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.comment.likes,
      id: props.comment._id,
      text: props.comment.text,
      username: props.comment.author.username
    }
    this.addOne = this.addOne.bind(this);
  }

  addOne() {
    axios.put(`http://localhost:3030/comment/${this.state.id}`, this.state.likes)
    .then((data) => {
      this.setState((prev) => {prev.likes++})
    })
    .catch((err) => {
      console.log('Something went wront with your "UPDATE" method on `comment/:id`')
    })
  }
  render() {
    return (
      <div>
        <div className="Comment">{this.state.text}</div>
        <div className="Author">{this.state.username}</div>
        <div className="likes" onClick={this.addOne}>{this.state.likes}</div>
      </div>
    )
  }
};