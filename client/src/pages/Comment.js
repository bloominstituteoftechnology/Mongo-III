import React from 'react';
import './Comment.css';

import { ListGroupItem } from 'react-bootstrap'

export const Comment = (props) => {
  const { text, author } = props.comment;
  return (
    <ListGroupItem>
      <div className="Author">
        {author.username} &nbsp;
        <em className="Comment">{text}</em>
      </div>
      {/* <div className="Comment">{text}</div> */}
    </ListGroupItem>
  )
};
