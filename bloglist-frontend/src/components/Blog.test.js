import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';
import CreateForm from './CreateForm';

const blog = {
  author: 'Kim',
  title: 'react',
  url: 'react.org',
  likes: 999,
  user: {
    username: 'trungho',
    name: 'trung',
    id: '61dde63ad45ec2e657a9f597',
  },
  id: '61f000f2cc4bb38310292924',
};

const user = {
  usrname: 'trungho',
  name: 'trung',
};
let component;
const mockHandler = jest.fn();
beforeEach(() => {
  component = render(
    <Blog blog={blog} user={user} handleLikes={mockHandler} />
  );
});

describe('render by default (5.13)', () => {
  test('render author and title by default', () => {
    const div = component.container.querySelector('.blog');
    expect(div).toHaveTextContent('Kim');
    expect(div).toHaveTextContent('react');
  });
  test('no rendering url and number of likes by default', () => {
    const div = component.container.querySelector('.blog-info');
    expect(div).toHaveStyle('display:none');
  });
});

test('5.14 - check url and likes are shown when clicking button', () => {
  const button = component.getByText('show');
  fireEvent.click(button);

  const div = component.container.querySelector('.blog-info');
  expect(div).not.toHaveStyle('display:none');
  expect(div).toHaveTextContent('react.org');
  expect(div).toHaveTextContent(999);
});

describe('5.15', () => {
  test('call eventhandler twice when click like button twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    const div = component.container.querySelector('.blog-info');
    expect(mockHandler.mock.calls).toHaveLength(2);
    expect(div).toHaveTextContent(1001);
  });
});

describe('Create blog ', () => {
  beforeEach(() => {
    component = render(
      <CreateForm createBlog={mockHandler} createBlogRef={mockHandler} />
    );
  });
  test('updates state and calls Submit', () => {
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('#create-blog');

    fireEvent.change(title, { target: { value: 'react' } });
    fireEvent.change(author, { target: { value: 'Kim' } });
    fireEvent.change(url, { target: { value: 'react.org' } });
    fireEvent.submit(form);

    expect(mockHandler.mock.calls).toHaveLength(1);
    console.log(mockHandler.mock.calls);
    expect(mockHandler.mock.calls[0][0]).toEqual({
      title: 'react',
      author: 'Kim',
      url: 'react.org',
    });
  });
});
