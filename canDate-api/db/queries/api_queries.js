const db = require("../../lib/connection");

const getAllUsers = () => {
  const queryStatement = `SELECT * FROM users`;
  return db
    .query(queryStatement)
    .then((response) => {
      return response.rows;
    })
    .catch((err) => {
      return err;
    });
};

const getAllUserTags = () => {
  const queryStatement = `
  SELECT users.id, tags.id AS interest
  FROM tags
  JOIN user_tag ON tags.id = tag_id
  JOIN users ON users.id = user_id;
  `;
  return db
    .query(queryStatement)
    .then((response) => {
      return response.rows;
    })
    .catch((err) => {
      return err;
    });
};

const getAllTags = () => {
  const queryStatement = `SELECT * FROM tags`;
  return db
    .query(queryStatement)
    .then((response) => {
      return response.rows;
    })
    .catch((err) => {
      return err;
    });
};

const getAllMessages = () => {
  const queryStatement = `SELECT * FROM message

  `;
  return db
    .query(queryStatement)
    .then((response) => {
      return response.rows;
    })
    .catch((err) => {
      return err;
    });
};

const createNewUser = (newUser) => {
  const value = [
    newUser["first_name"],
    newUser["last_name"],
    newUser["email"],
    newUser["password"],
  ];

  const queryStatement = `INSERT INTO users(first_name, last_name, email, password)
  VALUES ($1, $2, $3, $4)`;
  return db.query(queryStatement, value).catch((err) => {
    return err;
  });
};

const createNewMessage = (newMessage) => {
  const value = [
    newMessage["to_user_id"],
    newMessage["from_user_id"],
    newMessage["content"],
    newMessage["creates_on"],
  ];

  const queryStatement = `INSERT INTO message(to_user_id, from_user_id, content, creates_on)
  VALUES ($1, $2, $3, $4)
  RETURNING *`;

  return db
    .query(queryStatement, value)
    .then((res) => {
      return res.rows;
    })

    .catch((err) => {
      return err;
    });
};

const newUserTag = (newTagUser) => {
  const value = [newTagUser["user_id"], newTagUser["tag_id"]];

  const queryStatement = `INSERT INTO user_tag(user_id, tag_id) VALUES ($1, $2);`;

  return (
    db
      .query(queryStatement, value)
      // .then(() => {
      //   console.log("successes");
      // })
      .catch((err) => {
        return err;
      })
  );
};

const updateUser = (updateUser) => {
  const value = [
    updateUser.gender,
    updateUser.height,
    updateUser.address,
    updateUser.age,
    updateUser.url,
    updateUser.description,
    updateUser.id,
  ];

  const queryStatement = `UPDATE users
     SET gender = $1, height = $2, address = $3, age = $4, profile_photo = $5, about_me = $6
     WHERE id = $7`;
  return (
    db
      .query(queryStatement, value)
      // .then(() => {
      //   console.log("successes");
      // })
      .catch((err) => {
        return err;
      })
  );
};

const getAllFavoriteList = () => {
  const queryStatement = `SELECT * FROM favorite`;
  return db
    .query(queryStatement)
    .then((response) => {
      return response.rows;
    })
    .catch((err) => {
      return err;
    });
};

const getAllBlockList = () => {
  const queryStatement = `SELECT * FROM block`;
  return db
    .query(queryStatement)
    .then((response) => {
      return response.rows;
    })
    .catch((err) => {
      return err;
    });
};

const insertNewFavorite = (newFavorite) => {
  const value = [newFavorite["user_id"], newFavorite["favorite_user_id"]];

  const queryStatement = `INSERT INTO favorite(user_id, favorite_user_id)
  VALUES ($1, $2)
  RETURNING *`;

  return db
    .query(queryStatement, value)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      return err;
    });
};

const insertNewBlock = (newBlock) => {
  const value = [newBlock["user_id"], newBlock["block_user_id"]];
  const queryStatement = `INSERT INTO block(user_id, block_user_id)
  VALUES ($1, $2)
  RETURNING *`;

  return db
    .query(queryStatement, value)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      return err;
    });
};

const deleteFavorite = (newFavorite) => {
  const value = [newFavorite["user_id"], newFavorite["favorite_user_id"]];
  const queryStatement = `DELETE FROM favorite
  WHERE user_id = $1 AND favorite_user_id = $2
  RETURNING *`;

  return db
    .query(queryStatement, value)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      return err;
    });
};

module.exports = {
  getAllTags,
  getAllUsers,
  getAllUserTags,
  getAllMessages,
  createNewUser,
  createNewMessage,
  updateUser,
  newUserTag,
  getAllFavoriteList,
  getAllBlockList,
  insertNewFavorite,
  insertNewBlock,
  deleteFavorite,
};
