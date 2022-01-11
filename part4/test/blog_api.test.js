const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('../utils/helper_test');
const bcrypt = require('bcrypt');

const login = async () => {
  const result = await api.post('/api/login').send({
    username: 'trungho',
    password: '12345',
  });
  return result.body.token;
};

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('12345', 10);
  const user = new User({ username: 'trungho', passwordHash });
  await user.save();
  const userToAdd = await User.findOne({ username: 'trungho' });

  await Blog.deleteMany({});

  let blogObject = new Blog({ ...helper.initialBlogs[0], user: userToAdd.id });
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  const token = await login();
  await api
    .get('/api/blogs')
    .set({ Authorization: 'bearer ' + token })
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const token = await login();
  const response = await api
    .get('/api/blogs')
    .set({ Authorization: 'bearer ' + token });
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('verify id property is unique and defined', async () => {
  const token = await login();
  const response = await api
    .get('/api/blogs')
    .set({ Authorization: 'bearer ' + token })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const ids = response.body.map((r) => r.id);
  const isArrayUnique = (arr) =>
    Array.isArray(arr) && new Set(arr).size === arr.length;

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
  expect(isArrayUnique(ids)).toBeTruthy();
});

test('create a new blog post successfully with valid data', async () => {
  const token = await login();
  const newBlog = {
    title: 'HT in Vaasa',
    author: 'Trung',
    url: 'htivsa',
    likes: 1000,
  };

  await api
    .post('/api/blogs')
    .set({ Authorization: 'bearer ' + token })
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api
    .get('/api/blogs')
    .set({ Authorization: 'bearer ' + token });

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain(newBlog.title);
});

test('likes default equal 0', async () => {
  const token = await login();
  const newBlog = {
    title: 'HT in Vaasa',
    author: 'HT',
    url: 'htinvs',
  };

  await api
    .post('/api/blogs')
    .set({ Authorization: 'bearer ' + token })
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api
    .get('/api/blogs')
    .set({ Authorization: 'bearer ' + token });
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(response.body[helper.initialBlogs.length].likes).toBe(0);
});

test('miss title and url, 400 Bad request', async () => {
  const token = await login();
  const newBlog = {
    author: 'Ht',
    likes: 50,
  };

  await api
    .post('/api/blogs')
    .set({ Authorization: 'bearer ' + token })
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.BlogsinDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('deleting single blog post resource', async () => {
  const token = await login();
  const blogsBefore = await helper.BlogsinDb();
  const blogToDelete = blogsBefore[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set({ Authorization: 'bearer ' + token })
    .expect(204);

  const blogsAfter = await helper.BlogsinDb();
  expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogsAfter.map((r) => r.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test('Updating the information of an individual blog post', async () => {
  const token = await login();
  const blogs = await helper.BlogsinDb();
  const blogToUpdate = blogs[0];
  const update = {
    likes: 50,
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set({ Authorization: 'bearer ' + token })
    .send(update)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const updatedBlog = await api
    .get(`/api/blogs/${blogToUpdate.id}`)
    .set({ Authorization: 'bearer ' + token });

  expect(updatedBlog.body).toEqual(expect.objectContaining(update));
});

test('status code 401 Unauthorized with a not-provided-token', async () => {
  const blogs = await helper.BlogsinDb();
  const blogToUpdate = blogs[0];
  const update = {
    likes: 50,
  };
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(update).expect(401);
});

afterAll(async () => {
  await mongoose.connection.close();
});
