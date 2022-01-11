const bcrypt = require('bcrypt');
const User = require('../models/user');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('../utils/helper_test');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.userInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.userInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  describe('invalid users are not created', () => {
    test('creation failed if username is taken', async () => {
      const usersAtStart = await helper.userInDb();
      const newUser = {
        username: 'root',
        name: 'Matti Luukkainen',
        password: 'sekret',
      };
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('`username` to be unique');

      const usersAtEnd = await helper.userInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('status code 400 if username less than 3 characters in length', async () => {
      const usersAtStart = await helper.userInDb();
      const newUser = {
        username: 'ht',
        name: 'ho trung',
        password: '12345',
      };
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain(
        'shorter than the minimum allowed length'
      );

      const usersAtEnd = await helper.userInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('status code 400 if pw less than 3 characters in length', async () => {
      const usersAtStart = await helper.userInDb();
      const newUser = {
        username: 'trung',
        name: 'ho trung',
        password: '12',
      };
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain(
        `Path \`password\` is required 3 at least.`
      );

      const usersAtEnd = await helper.userInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });
  describe('Both username and pw must be required', () => {
    test('Username is required', async () => {
      const usersAtStart = await helper.userInDb();
      const newUser = {
        name: 'HO trung',
        password: '12345',
      };
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('Path `username` is required');
      const usersAtEnd = await helper.userInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('pw is required', async () => {
      const usersAtStart = await helper.userInDb();
      const newUser = {
        username: '12345',
        name: 'HO trung',
      };
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain(`Path \`password\` is required.`);
      const usersAtEnd = await helper.userInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
