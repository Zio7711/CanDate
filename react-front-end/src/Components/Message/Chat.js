import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import './Chat.scss';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import {
  filteredMessageByLoginUser,
  filteredMessageBySelectedUser,
  getAllID,
  reduceToNames,
  reduceToNamesId,
} from '../../helpers/messageHelper';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  getFavoriteByUser,
  getUserIBlock,
} from '../../helpers/favoriteBlockHelp';

const Chat = (props) => {
  let { id } = useParams();
  const {
    messages,
    users,
    setSelectedUserId,
    loading,
    selectedUserMessages,
    selectedUserId,
    favorite,
    block,
    unread,
    setUnread,
  } = props;

  const filteredFavorite = getFavoriteByUser(favorite, id);
  const userIBlock = getUserIBlock(block, id);

  const userAllMessages = filteredMessageByLoginUser(messages, id);
  const reducedMessage = reduceToNames(userAllMessages, id, userIBlock);

  const [userPhoto, setUserPhoto] = useState('');
  const [userFirstName, setUserFirstName] = useState('');

  useEffect(() => {
    if (users.length !== 0) {
      setUserPhoto(users[Number(id) - 1]['profile_photo']);
      setUserFirstName(users[Number(id) - 1]['first_name']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const allId = getAllID(userAllMessages);

  let messageObj = {};

  allId.forEach((id) => {
    messageObj[id.toString()] = filteredMessageBySelectedUser(
      userAllMessages,
      id
    );
  });

  const reducedToNamesId = reduceToNamesId(userAllMessages, id);

  const reducedMessagesComp = reducedMessage.map((message) => {
    const idAndUnread = { [message.id]: unread };
    if (reducedToNamesId.includes(message['to_user_id'])) {
      return (
        <SidebarChat
          key={message.id}
          to_user_id={message['to_user_id']}
          from_name={users[message['from_user_id'] - 1]['first_name']}
          to_name={users[message['to_user_id'] - 1]['first_name']}
          message={message}
          profilePic={users[message['to_user_id'] - 1]['profile_photo']}
          setSelectedUserId={setSelectedUserId}
          selectedUserId={selectedUserId}
          selectedUserMessages={selectedUserMessages}
          userAllMessages={userAllMessages}
          messageObj={messageObj}
          filteredFavorite={filteredFavorite}
          unread={unread}
          setUnread={setUnread}
          idAndUnread={idAndUnread}
          id={id}
        />
      );
    } else if (reducedToNamesId.includes(message['from_user_id'])) {
      return (
        <SidebarChat
          key={message.id}
          to_user_id={message['from_user_id']}
          from_name={users[message['to_user_id'] - 1]['first_name']}
          to_name={users[message['from_user_id'] - 1]['first_name']}
          message={message}
          profilePic={users[message['from_user_id'] - 1]['profile_photo']}
          setSelectedUserId={setSelectedUserId}
          selectedUserId={selectedUserId}
          selectedUserMessages={selectedUserMessages}
          userAllMessages={userAllMessages}
          messageObj={messageObj}
          filteredFavorite={filteredFavorite}
          unread={unread}
          setUnread={setUnread}
          idAndUnread={idAndUnread}
          id={id}
        />
      );
    }
    return null;
  });

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar className="chat__image" alt="Zio" src={userPhoto} />
        <h2> {userFirstName}</h2>
        <div className="sidebar_headerRight">
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar_chats">{reducedMessagesComp}</div>
    </div>
  );
};

export default Chat;
