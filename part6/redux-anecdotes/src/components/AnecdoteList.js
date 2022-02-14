import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteIncrease } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content} </div>
      <p>
        has {anecdote.votes} <button onClick={handleClick}>vote</button>{' '}
      </p>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((f) =>
      f.content.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const vote = async (anecdote) => {
    const newVote = await anecdoteService.updateVote(anecdote);
    dispatch(voteIncrease(newVote));
    dispatch(setNotification(`you voted '${anecdote.content}'`), 1500);
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote)}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
