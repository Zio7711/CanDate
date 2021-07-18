import React from 'react';
import TagListItem from './TagListItem';
import Button from '@material-ui/core/Button';

export default function TagList(props) {
  const lists = props.tags.map((item) => {
    return (
      <TagListItem
        key={item.id}
        name={item.name}
        tag_id={item.id}
        id={props.id}
      />
    );
  });

  return (
    <div className="tagList">
      <img
        alt="tagList"
        src="https://github.com/MattLuo90/CanDate/blob/master/react-front-end/src/docs/logo.jpg?raw=true"
        width="80"
        style={{ marginTop: '10px', marginBottom: '-25px' }}
      />
      <h3 style={{ marginTop: ' 20px' }}>Passions</h3>
      <div style={{ fontSize: '35px' }}>{lists}</div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={() =>
          window.location.replace(`http://localhost:3002/user/${props.id}`)
        }
        style={{ width: '25vw ', marginTop: '5px' }}
      >
        Submit
      </Button>
    </div>
  );
}
