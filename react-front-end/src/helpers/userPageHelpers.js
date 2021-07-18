export function getLoggedInUserInfo(id, users) {
  if (users.length !== 0) {
    return [users[Number(id) - 1]];
  }
}

//filter male or female (get users with different gender)
export function getFilteredUsersByGender(gender, users) {
  const filteredUsers = [];
  for (const user of users) {
    if (user.gender !== gender) {
      filteredUsers.push(user);
    }
  }
  return filteredUsers;
}

// get city for logged in user
export function getLoggedInUserCity(id, users) {
  if (users.length !== 0) {
    return users[id - 1].address;
  }
}

// returns array of interest ids
export function filterTags(id, userTag) {
  const tagArr = [];
  for (const tag of userTag) {
    if (tag.id === id) {
      tagArr.push(tag.interest);
    }
  }

  return tagArr;
}

//returns an object of user id and its associated tags array
export function userIdWithTagsArrObj(users, userTag) {
  const Obj = {};
  users.forEach((user) => {
    const objId = user.id;
    Obj[objId] = filterTags(user.id, userTag);
  });
  return Obj;
}

// returns array of interest names
export function getNameOfTag(tagArr, tags) {
  const tagNameArr = [];
  for (const tagId of tagArr) {
    // for (const obj of tags) {
    //   if (tag === obj.id) {
    //     tagNameArr.push(obj.name);
    //   }
    // }
    tagNameArr.push(tags[tagId - 1].name);
  }
  //[movie. sport]
  let userTag = {
    tags: tagNameArr,
    //id:1
    //tags : [sport, movie]
  };
  return userTag.tags;
}

// interest filter: returns filtered array of unique users
export function getFilteredUsersByInterest(interests, userTagObj, users) {
  if (interests.length === 0) {
    return users;
  }

  const checkIfContainsAllInterest = (userInterests, requiredInterests) => {
    let result = false;
    let matchPoint = 0;
    requiredInterests.forEach((requiredInterest) => {
      if (userInterests.includes(requiredInterest)) {
        result = true;
        matchPoint++;
      }
    });

    return { result, matchPoint };
  };

  let filteredUserWithMatchPointObj = [];
  for (const userId in userTagObj) {
    const { result, matchPoint } = checkIfContainsAllInterest(
      userTagObj[userId],
      interests
    );
    if (result) {
      filteredUserWithMatchPointObj.push({ userId, matchPoint });
    }
    filteredUserWithMatchPointObj.sort((a, b) => {
      return b.matchPoint - a.matchPoint;
    });
  }

  let filteredUsers = [];

  filteredUserWithMatchPointObj.forEach((obj) => {
    filteredUsers.push(users[obj.userId - 1]);
  });

  return filteredUsers;
}

export function getUserIdWithMatchPointObj(
  interests,
  userTagObj,
  users,
  requiredInterests
) {
  const checkIfContainsAllInterest = (userInterests, requiredInterests) => {
    let result = false;
    let matchPoint = 0;
    requiredInterests.forEach((requiredInterest) => {
      if (userInterests.includes(requiredInterest)) {
        result = true;
        matchPoint++;
      }
    });

    return { result, matchPoint };
  };

  let filteredUserWithMatchPointObj = [];
  for (const userId in userTagObj) {
    const { matchPoint } = checkIfContainsAllInterest(
      userTagObj[userId],
      interests
    );

    filteredUserWithMatchPointObj.push({ userId, matchPoint });

    filteredUserWithMatchPointObj.sort((a, b) => {
      return b.matchPoint - a.matchPoint;
    });
  }

  let filteredUsers = [];

  filteredUserWithMatchPointObj.forEach((obj) => {
    if (obj.matchPoint === 0) {
      filteredUsers.push({
        userId: users[obj.userId - 1].id,
        matchPoint: obj.matchPoint,
        percentage: 0,
      });
    } else {
      filteredUsers.push({
        userId: users[obj.userId - 1].id,
        matchPoint: obj.matchPoint,
        percentage: Math.round(
          (obj.matchPoint / requiredInterests.length) * 100
        ),
      });
    }
  });

  return filteredUsers;
}

// age filter: returns array of user ids for filtered users
export function getFilteredUsersByAge(users, ageRange) {
  const filteredUsers = [];

  if (ageRange.length === 0) {
    return users;
  }

  for (const user of users) {
    if (user.age >= ageRange[0] && user.age <= ageRange[1]) {
      filteredUsers.push(user);
    }
  }

  return filteredUsers;
}

// city filter: returns array of user ids who live in those cities
export function getFilteredUsersByCity(cities, users) {
  const filteredUsers = [];

  if (cities.length === 0) {
    return users;
  }

  users.forEach((eachUser) => {
    if (cities.includes(eachUser.address)) {
      filteredUsers.push(eachUser);
    }
  });

  return filteredUsers;
}

export function getSortedUsers(userMatchObj, users) {
  let result = [];
  userMatchObj.forEach((userObj) => {
    result.push(users[userObj.userId - 1]);
  });

  return result;
}
