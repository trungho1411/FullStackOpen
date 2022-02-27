import React from 'react';
import { useState } from 'react';
import { useImperativeHandle } from 'react';
import propTypes from 'prop-types';
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hiddenWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hiddenWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <button onClick={toggleVisibility}>CANCEL</button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired,
};

export default Togglable;
