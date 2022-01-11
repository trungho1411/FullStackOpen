const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (total, blog) => total + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  const reducer = (fav, blog) => {
    if (fav.likes >= blog.likes) {
      return fav;
    } else return blog;
  };
  return blogs.reduce(reducer, blogs[0]);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const authors = _.countBy(blogs, 'author');
  const authorList = Object.entries(authors);
  console.log(authorList);
  const reducer = (most, curr) => {
    if (curr[1] >= most[1]) return curr;
    else return most;
  };
  const mostBlogger = authorList.reduce(reducer);
  return {
    author: mostBlogger[0],
    blogs: mostBlogger[1],
  };
};

const mostLikes = (blogs) => {
  const authors = [...new Set(blogs.map((p) => p.author))];
  const likes = Array(authors.length).fill(0);
  blogs.map((p) => {
    authors.map((a) => {
      if (p.author === a) likes[authors.indexOf(a)] += p.likes;
    });
  });
  const most = {
    author: authors[likes.indexOf(Math.max(...likes))],
    likes: Math.max(...likes),
  };
  return blogs.length === 0 ? 'no author with most likes' : most;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
