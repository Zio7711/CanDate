import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './TagListItem.scss';

const TagListItem = (props) => {
  const [num, setNum] = useState(1);
  const [newColor, setNewColor] = useState('lightgrey');

  function handleClick(num, name, id) {
    let newTagUser = {
      user_id: id,
      tag_id: name,
    };
    num++;
    setNum(num);
    if (num % 2 === 0) {
      setNewColor('#f2a1a3');
      axios
        .put('/api/user_tag/new', { newTagUser })
        .catch((err) => console.log(err));
      return;
    }
    setNewColor('lightgrey');
  }

  return (
    <Button
      className="tag_button"
      onClick={() => {
        handleClick(num, props.tag_id, props.id);
      }}
      style={{
        backgroundColor: newColor,
        paddingTop: '1px',
        paddingBottom: '1px',
        paddingLeft: '8px',
        paddingRight: '8px',
        color: 'black',
        border: '2px solid lightblue',
        fontSize: 'medium',
      }}
    >
      {props.name}{' '}
    </Button>
  );
};

export default TagListItem;
