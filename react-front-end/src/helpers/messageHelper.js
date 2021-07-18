const reduceToNames = (message, userId, userIBlock) => {
  let id = [];
  let result = [];
  message.reverse();
  if (userIBlock) {
    message.forEach((el) => {
      if (
        !id.includes(el['to_user_id']) &&
        Number(userId) !== el['to_user_id']
      ) {
        result.push(el);
        id.push(el['to_user_id']);
      } else if (
        !id.includes(el['from_user_id']) &&
        Number(userId) !== el['from_user_id'] &&
        !userIBlock.includes(el['from_user_id'])
      ) {
        result.push(el);
        id.push(el['from_user_id']);
      }
    });
  }

  return result;
};

const reduceToNamesId = (message, userId) => {
  let id = [];

  message.forEach((el) => {
    if (!id.includes(el['to_user_id']) && Number(userId) !== el['to_user_id']) {
      id.push(el['to_user_id']);
    } else if (
      !id.includes(el['from_user_id']) &&
      Number(userId) !== el['from_user_id']
    ) {
      id.push(el['from_user_id']);
    }
  });
  return id;
};

const reduceToNamesIncludingMe = (message) => {
  let id = [];
  let result = [];

  message &&
    message.forEach((el) => {
      if (!id.includes(el['to_user_id'])) {
        result.push(el);
        id.push(el['to_user_id']);
      }
    });

  return result;
};

const filteredMessageByLoginUser = (messages, loginUserId) => {
  return messages.filter((message) => {
    return (
      message['to_user_id'] === Number(loginUserId) ||
      message['from_user_id'] === Number(loginUserId)
    );
  });
};

const filteredMessageBySelectedUser = (messages, selectedUserId) => {
  return messages.filter((message) => {
    return (
      message['to_user_id'] === Number(selectedUserId) ||
      message['from_user_id'] === Number(selectedUserId)
    );
  });
};

const filterMessageByToUserId = (messages, selectedUserId) => {
  return messages.filter((message) => {
    return message['to_user_id'] === Number(selectedUserId);
  });
};

const getRidOfUsersChatBox = (messages, userId) => {
  return messages.filter((message) => {
    return message['to_user_id'] !== Number(userId);
  });
};

const getAllID = (messages) => {
  const allID = [];
  messages.forEach((message) => {
    if (!allID.includes(message['to_user_id'])) {
      allID.push(message['to_user_id']);
    }

    if (!allID.includes(message['from_user_id'])) {
      allID.push(message['from_user_id']);
    }
  });
  return allID;
};

const justYouAndMe = (twoMessageArr, meId, youId) => {
  let result = [];
  twoMessageArr.forEach((message) => {
    if (
      (Number(message['from_user_id']) === Number(meId) &&
        Number(message['to_user_id']) === Number(youId)) ||
      (Number(message['from_user_id']) === Number(youId) &&
        Number(message['to_user_id']) === Number(meId))
    ) {
      result.push(message);
    }
  });
  return result;
};

module.exports = {
  reduceToNames,
  filterMessageByToUserId,
  filteredMessageByLoginUser,
  getRidOfUsersChatBox,
  filteredMessageBySelectedUser,
  reduceToNamesIncludingMe,
  getAllID,
  justYouAndMe,
  reduceToNamesId,
};
