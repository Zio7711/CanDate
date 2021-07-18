import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import './Message.scss';
import ChatScreen from './ChatScreen';
import {
  filteredMessageByLoginUser,
  filteredMessageBySelectedUser,
  reduceToNames,
} from '../../helpers/messageHelper';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getUserIBlock } from '../../helpers/favoriteBlockHelp';

const Message = (props) => {
  let { id } = useParams();
  const { messages, users, setMessages, loading, favorite, block } = props;
  const userAllMessages = filteredMessageByLoginUser(messages, id);
  const userIBlock = getUserIBlock(block, id);
  const reducedMessage = reduceToNames(userAllMessages, id, userIBlock);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [unread, setUnread] = useState(true);

  useEffect(() => {
    if (reducedMessage.length !== 0) {
      let setDataToSelectedUserId;

      if (reducedMessage[0]['from_user_id'] !== Number(id)) {
        setDataToSelectedUserId = reducedMessage[0]['from_user_id'];
      } else {
        setDataToSelectedUserId = reducedMessage[0]['to_user_id'];
      }
      setSelectedUserId(setDataToSelectedUserId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const selectedUserMessages = filteredMessageBySelectedUser(
    userAllMessages,
    selectedUserId
  );

  const selectedPhoto = selectedUserId
    ? users[selectedUserId - 1]['profile_photo']
    : null;

  return (
    <div className="app">
      <div className="app_body">
        <Chat
          messages={messages}
          users={users}
          setMessages={setMessages}
          setSelectedUserId={setSelectedUserId}
          loading={loading}
          selectedUserMessages={selectedUserMessages}
          selectedUserId={selectedUserId}
          favorite={favorite}
          block={block}
          unread={unread}
          setUnread={setUnread}
        />
        <ChatScreen
          selectedMessages={selectedUserMessages}
          messages={messages}
          setMessages={setMessages}
          selectedPhoto={selectedPhoto}
          users={users}
          block={block}
          loading={loading}
          handleMessageClose={props.handleMessageClose}
        />
      </div>
    </div>
  );
};

export default Message;
