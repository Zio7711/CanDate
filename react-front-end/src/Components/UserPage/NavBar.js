import React, { useState, useEffect } from 'react';
import './NavBar.scss';
import AppBar from '@material-ui/core/AppBar';
// import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FilterPopUp from './FilterPopUp';
import axios from 'axios';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Switch from '@material-ui/core/Switch';

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

// const useStyles = makeStyles((theme) => ({
//   grow: {
//     flexGrow: 1,
//   },
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   sectionDesktop: {
//     display: 'none',
//     [theme.breakpoints.up('md')]: {
//       display: 'flex',
//     },
//   },
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// }));

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

//from line 24 - 90 are all material ui functions

export default function NavBar(props) {
  const handleChange = (event) => {
    setCheckedA(!checkedA);
  };

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClosed = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    ageRange,
    updateAgeRange,
    users,
    handleAddressClick,
    buttonColor,
    checkedA,
    setCheckedA,
  } = props;
  const [tag, setTags] = useState([]);

  useEffect(() => {
    axios.get('/api/tags').then((res) => {
      setTags(res.data.tags);
    });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" color="inherit" className="nav-bar">
        <Toolbar>
          <div className="nav-bar-title">
            <img
              alt="logo"
              src="https://github.com/MattLuo90/CanDate/blob/master/react-front-end/src/docs/logo.jpg?raw=true"
              width="80"
              style={{ marginLeft: '30px' }}
            />
            <div className="nav-bar-logo">
              <p>CanDate</p>
            </div>
          </div>

          <div className="nav-bar-tab">
            <div>
              {/* <Tab label="Filter" onClick={(e) => handleClickOpen(e)} /> */}
              <Button className="favorite" onClick={(e) => handleClickOpen(e)}>
                {' '}
                Filter{' '}
              </Button>
              <Dialog
                onClose={(e) => handleClosed(e)}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogTitle
                  id="customized-dialog-title"
                  onClose={handleClosed}
                >
                  Filter Results:
                </DialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    <FilterPopUp
                      handleTagClick={props.handleTagClick}
                      handleAddressClick={handleAddressClick}
                      content={tag}
                      save={handleClosed}
                      savebtn={<Button>Save</Button>}
                      ageRange={ageRange}
                      updateAgeRange={updateAgeRange}
                      users={users}
                      buttonColor={buttonColor}
                      setGender={props.setGender}
                      state={props.state}
                      setStartNum={props.setStartNum}
                      setEndNum={props.setEndNum}
                    />
                  </Typography>
                  <div className="filter_buttons">
                    <button className="save" onClick={handleClosed}>
                      Save
                    </button>
                    <button
                      className="delete"
                      label="Clear Filter"
                      onClick={() => props.handleEmptyTagsClick()}
                    >
                      Clear Filter
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="favorite_switch">
              <Button
                className="favorite"
                onClick={(e) => {
                  props.handleFavorite(e);
                  handleChange();
                }}
              >
                {' '}
                Favorite{' '}
              </Button>
              <Switch
                checked={checkedA}
                onClick={(e) => {
                  props.handleFavorite(e);
                  handleChange();
                }}
              />
            </div>
          </div>
          <div className="buttonList">
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={(e) => props.handleMessageOpen(e)}
            >
              <Badge color="secondary" variant="dot">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge color="secondary" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleClick}>
              <AccountCircle aria-controls="simple-menu" aria-haspopup="true" />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{ marginTop: '50px' }}
            >
              <Button
                variant="contained"
                color="secondary"
                href="http://localhost:3002"
                onClick={handleClose}
              >
                logout
              </Button>
            </Menu>

            <p style={{ marginTop: '14px' }}>
              Welcome{' '}
              <strong>{props.name[0] && props.name[0]['first_name']}</strong>
            </p>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
