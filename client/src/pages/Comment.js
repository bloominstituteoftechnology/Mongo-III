import React from 'react';
import './Comment.css';

export const Comment = (props) => {
  const { text } = props.comment;
  const author = props.comment.author.username;
  return (
    <div>
      <div className="Comment">{text}</div>
      <div className="Author">{author}</div>
    </div>
  )
};