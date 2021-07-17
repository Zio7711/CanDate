const express = require("express");
const router = express.Router();
const apiQueries = require("../db/queries/api_queries");

module.exports = function () {
  //get all users info from database
  //including id, first_name, last_name, email, password, gender, height, address, age, profile_photo, about_me
  router.get("/users", (req, res) => {
    apiQueries
      .getAllUsers()
      .then((users) => {
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //get all tags from database
  //including id and name
  router.get("/tags", (req, res) => {
    apiQueries
      .getAllTags()
      .then((tags) => {
        res.json({ tags });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //get all user_tag including user_id and its associated tag_id
  router.get("/user_tag", (req, res) => {
    apiQueries
      .getAllUserTags()
      .then((user_tag) => {
        res.json({ user_tag });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //get all messages including from_user_id and to_user_is and creates_on
  router.get("/message", (req, res) => {
    apiQueries
      .getAllMessages()
      .then((message) => {
        res.json({ message });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //including user_id and favorite_user_id
  router.get("/favorite", (req, res) => {
    apiQueries
      .getAllFavoriteList()
      .then((favorites) => {
        res.json({ favorites });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //including user_id and block_user_id
  router.get("/block", (req, res) => {
    apiQueries
      .getAllBlockList()
      .then((block) => {
        res.json({ block });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
