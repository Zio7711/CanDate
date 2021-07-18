const getFavoriteByUser = (favorite, id) => {
  let result = [];

  let filteredFavorite = favorite.filter((user) => {
    return Number(user.user_id) === Number(id);
  });
  filteredFavorite.forEach((element) => {
    if (!result.includes(element.favorite_user_id)) {
      result.push(element.favorite_user_id);
    }
  });
  return result;
};

const getUserBlockMe = (block, id) => {
  let result = [];
  let filteredBlock = block.filter((user) => {
    return Number(user.block_user_id) === Number(id);
  });
  filteredBlock.forEach((element) => {
    result.push(element.user_id);
  });
  return result;
};

const getUserIBlock = (block, id) => {
  let result = [];
  let filteredBlock = block.filter((user) => {
    return Number(user.user_id) === Number(id);
  });
  filteredBlock.forEach((element) => {
    if (!result.includes(element.block_user_id) && element.block_user_id) {
      result.push(element.block_user_id);
    }
  });
  return result;
};

const getUsersByBlocked = (users, blockIdList) => {
  return users.filter((user) => !blockIdList.includes(user.id));
};

const findIndexOfFavorite = (favorite, id, favorite_user_id) => {
  let result;
  favorite.forEach((item, index) => {
    if (
      item.favorite_user_id === Number(favorite_user_id) &&
      item.user_id === Number(id)
    ) {
      result = index;
    }
  });

  return result;
};

const checkIfLiked = (favorite, id, favorite_user_id) => {
  let result = false;
  favorite.forEach((item, index) => {
    if (
      item.favorite_user_id === Number(favorite_user_id) &&
      item.user_id === Number(id)
    ) {
      result = true;
    }
  });
  return result;
};

module.exports = {
  getFavoriteByUser,
  getUserBlockMe,
  getUserIBlock,
  getUsersByBlocked,
  findIndexOfFavorite,
  checkIfLiked,
};
