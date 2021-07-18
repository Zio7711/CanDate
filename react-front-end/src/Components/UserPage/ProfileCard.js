import Message from '../Message/Message';
import React, { useState } from 'react';
import './ProfileCard.scss';
import { Typography, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import BlockIcon from '@material-ui/icons/Block';
import DialogContentText from '@material-ui/core/DialogContentText';
import {
  checkIfLiked,
  findIndexOfFavorite,
} from '../../helpers/favoriteBlockHelp';
import classNames from 'classnames';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ProfileCard(props) {
  const { openMsg, setOpenMsg, handleMessageClose } = props;

  let { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const { favorite } = props;

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleLike = () => {
    const newFavorite = {
      user_id: Number(id),
      favorite_user_id: Number(props.id),
      id: favorite.length + 1,
    };
    const unlikeIndex = findIndexOfFavorite(
      favorite,
      Number(id),
      Number(props.id)
    );

    let newFavoriteAfterDelete = [...favorite];
    newFavoriteAfterDelete.splice(unlikeIndex, 1);

    if (checkIfLiked(favorite, Number(id), Number(props.id))) {
      axios
        .put('/api/deleteFavorite', {
          newFavorite: { ...newFavorite },
        })
        .then(() => {
          props.setFavorite([...newFavoriteAfterDelete]);
        });
    } else {
      axios
        .put('/api/favorites', {
          newFavorite: { ...newFavorite },
        })
        .then(() => {
          props.setFavorite([...favorite, newFavorite]);
        });
    }
  };

  const title = props.name + ', ' + props.age;

  const handleClickMessage = () => {
    const myName = props.users[Number(id) - 1].first_name;

    const newMessage = {
      from_user_id: Number(id),
      to_user_id: Number(props.id),
      content: `Hello! I am ${myName}`,
    };

    const timeElapsed = Date.now();

    let today = new Date(timeElapsed);

    let time = today.toLocaleString('en-GB');
    axios
      .put('/api/users/:id/messages', {
        newMessage: { ...newMessage, creates_on: time },
      })
      .then((res) => {
        props.setMessages([...props.messages, ...res.data]);
      })
      .then(() => {
        setOpenMsg(true);
      })
      .catch((err) => {
        console.log('Put error on new messages', err);
      });
  };

  const handleBlock = () => {
    const newBlock = {
      user_id: Number(id),
      block_user_id: Number(props.id),
    };

    axios
      .put('/api/blocks', {
        newBlock: { ...newBlock },
      })
      .then(() => {
        props.setBlock([...props.block, newBlock]);
      });
  };

  let color;
  props.filteredFavoriteId.includes(props.id)
    ? (color = 'red')
    : (color = 'black');

  const VIPs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 47, 50, 60, 61, 63];

  const VIPsClass = classNames('card', {
    'glow-on-hover': VIPs.includes(props.id),
  });

  return (
    <>
      <div className={VIPsClass}>
        <div className="card-top">
          <div className="card_match">
            <strong>{props.users[Number(props.id - 1)].percent} % Match</strong>
          </div>
          <div className="card-address">
            <PersonPinCircleIcon fontSize="medium" />
            <strong>{props.address}</strong>
          </div>
        </div>
        <div className="icon">
          {' '}
          <IconButton
            className="icon_button"
            key="1"
            style={{ color: color }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLike();
            }}
          >
            <FavoriteIcon />
          </IconButton>
          {/* open message dialogue */}
          <IconButton
            className="icon_button"
            key="2"
            onClick={handleClickMessage}
            style={{ color: 'black' }}
          >
            <ChatBubbleIcon />
          </IconButton>
          <Dialog
            key="3"
            onClose={handleMessageClose}
            aria-labelledby="customized-dialog-title"
            open={openMsg}
            maxWidth="xl"
          >
            <Message
              key="14"
              messages={props.messages}
              users={props.users}
              setMessages={props.setMessages}
              loading={props.loading}
              realTimeData={props.realTimeData}
              favorite={props.favorite}
              block={props.block}
              handleMessageClose={handleMessageClose}
            />
          </Dialog>
          <IconButton
            className="icon_button"
            key="6"
            onClick={() => {
              handleClickOpenConfirm();
            }}
            style={{ color: 'black' }}
          >
            <BlockIcon />
          </IconButton>
          {/* from here is the block confirmation */}
          <Dialog
            key="7"
            open={openConfirm}
            onClose={handleCloseConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle key="15" id="alert-dialog-title">
              {'Are you sure you want to block this person?'}
            </DialogTitle>
            <DialogContent key="16">
              <DialogContentText key="17" id="alert-dialog-description">
                You will not get any information or message from this person.
              </DialogContentText>
            </DialogContent>
            <DialogActions key="19">
              <Button key="9" onClick={handleCloseConfirm} color="primary">
                Cancel
              </Button>
              <Button
                key="10"
                onClick={() => {
                  handleCloseConfirm();
                  handleBlock();
                }}
                variant="danger"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <img
          alt={props.name}
          src={props.profile_photo}
          className="profile_photo"
        />
        {props.filteredFavoriteId.includes(props.id) && (
          <img
            className="crown"
            alt="crown"
            src="https://github.com/MattLuo90/CanDate/blob/cdd/crown/react-front-end/public/images/output-onlinepngtools.png?raw=true"
          />
        )}
        <div className="card-dialog">
          <div className="card-dialog-open">
            <ArrowForwardIcon />
            <button
              className="card-dialog-open-button"
              onClick={handleClickOpen}
            >
              Learn more
            </button>
          </div>
          <Dialog
            key="12"
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle
              key="20"
              id="customized-dialog-title"
              onClose={handleClose}
              style={{ width: '600px' }}
            >
              <strong>About Me</strong>
            </DialogTitle>
            <DialogContent key="21" dividers>
              <Typography key="13" gutterBottom>
                <strong>Name:</strong> {props.name} {props['last_name']}
              </Typography>
              <Typography key="1" gutterBottom>
                <strong> City: </strong>
                {props.city}
              </Typography>
              <Typography key="2" gutterBottom>
                <strong>Gender:</strong> {props.gender}
              </Typography>
              <Typography key="3" gutterBottom>
                <strong> Age: </strong>
                {props.age}
              </Typography>
              <Typography key="4" gutterBottom>
                <strong> Height: </strong>
                {props.height}
              </Typography>
              <Typography key="5" gutterBottom>
                <strong> Notes: </strong>
                {props['about_me']}
              </Typography>
            </DialogContent>
          </Dialog>
        </div>
        <div className="card_content">
          <div className="card_title">
            <strong>{title}</strong>
          </div>
          <div className="card-notes">{props['about_me']}</div>
          <div>
            {props.tag.map((item) => {
              return (
                <Button
                  key={item}
                  className="profile_card_tags"
                  style={{
                    backgroundColor: 'rgba(34, 34, 34, 0.05)',
                    paddingTop: '1px',
                    paddingBottom: '1px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    marginTop: '4px',
                    color: '#999999',
                    border: '2px solid lightblue',
                    fontSize: 'medium',
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
