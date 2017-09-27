const {
  postNew,
  postsGetAll,
  postGetById,
  postUpdate
} = require('../domain/post/postMethods');

const { createComment } = require('./commentServices');

const { validPost } = require('../validation/postValidation');


const getAllPosts = async () => {
  const posts = await postsGetAll();
  if (posts.length > 0) return posts;
  return { error: { message: 'No posts found' } };
};

const createPost = async (post) => {
  const invalidPost = validPost(post);
  if (!invalidPost) {
    const newPost = await postNew(post);
    return newPost;
  }
  return { error: { message: invalidPost } };
};

const getPostById = async (id) => {
  const post = await postGetById(id);
  if (post) return post;
  return { error: { message: 'Unable to find post' } };
};

const createPostComment = async (comment) => {
  const newComment = await createComment(comment);
  if (newComment) {
    const postToUpdate = await postGetById(comment._parent);
    if (postToUpdate) {
      postToUpdate.comments.push(newComment._id);
      const updatedPost = await postUpdate(postToUpdate);
      return updatedPost;
    }
    return { error: { message: 'Unable to find parent post' } };
  }
  return { error: { message: 'Unable to create comment' } };
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  createPostComment
}