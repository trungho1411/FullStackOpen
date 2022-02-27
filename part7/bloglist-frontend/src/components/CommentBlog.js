import React from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { commentBlog } from '../reducers/blogReducer';

const CommentBlog = ({ blog }) => {
  const dispatch = useDispatch();

  const handleComment = (event) => {
    event.preventDefault();

    const comment = event.target.comment.value;

    event.target.value = '';

    dispatch(commentBlog(blog, { comment }));
    dispatch(setNotification(`Blog ${blog.title} has a new comment `));
  };
  return (
    <div>
      <form id='comment-blog' onSubmit={handleComment}>
        <input name='comment' required />
        <button type='submit'>add comment</button>
      </form>
    </div>
  );
};

export default CommentBlog;
