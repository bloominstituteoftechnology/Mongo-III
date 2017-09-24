import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class BlogPosts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [
        {title: 'This is a fake post', _id: '325kjlljh'},
        {title: 'This is another fake post', _id: '234sdjlk'}
      ],
      authorData: []
    };
  }
  componentDidMount() {
    axios.get('http://localhost:3030/posts')
      .then((data) => {
        this.setState({posts: data.data});
      })
      .catch((err) => {
        console.log('You still need to implement the `POSTS` `GET`', err);
      });
    axios.get('http://localhost:3030/aggregated')
      .then((data) => {
        console.log(data)
        this.setState({authorData: data.data});
        console.log(this.state)
      })
      .catch((err) => {
        console.log('aggregate error', err);
      });
  }

  render() {
    const { posts, authorData } = this.state;
    return (
      <div>
      <Link to='/new-post'><button className="btn btn-default btn-sm">Create New Post</button></Link>
        {posts.map((post) => {
          return (
              <div key={post._id}>
                <Link to={`posts/${post._id}`}>{post.title}</Link>
              </div>
            )
        })}
        <h1>Top Posting Users</h1>
        {authorData.map((author) => {
          return (
            <div key={author._id}>
              <h3>{author.author[0].username}</h3>
              <p>{author.count}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

