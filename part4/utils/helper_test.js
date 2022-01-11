const usersRouter = require('../controllers/user');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'ABC',
    author: 'Trung',
    url: 'api.blogs',
    likes: 100,
  },
  {
    title: 'CDE',
    author: 'Trung',
    url: 'api.blogs',
    likes: 1001,
  },
];

const BlogsinDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const userInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  BlogsinDb,
  userInDb,
};
