const express = require("express");
const router = express.Router();
const apiQueries = require("../db/queries/api_queries");

module.exports = function (app) {
  //sign up for a new user
  router.put("/users", (req, res) => {
    res.json("success");
    apiQueries.createNewUser(req.body.newUser).catch((err) => {
      console.log(err);
    });
  });

  //add tags for the new user
  router.put("/user_tag/new", (req, res) => {
    apiQueries
      .newUserTag(req.body.newTagUser)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //update user info(gender, height cities...)
  router.put("/signup/:id", (req, res) => {
    apiQueries
      .updateUser(req.body.updateUser)
      .then(() => {
        res.json("success");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //generate websocket connections for each logged in users
  let msgWS = [];
  app.ws("/message", function (ws, req) {
    msgWS.push(ws);
  });

  //generating new messages
  router.put("/users/:id/messages", (req, res) => {
    apiQueries
      .createNewMessage(req.body.newMessage)
      .then((data) => {
        res.status(200).json(data);
        msgWS.forEach((eachWS) => {
          eachWS.send(JSON.stringify(data));
        });
      })
      .then(() => {
        console.log("Send message to websocket users");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //like a user
  router.put("/favorites", (req, res) => {
    apiQueries
      .insertNewFavorite(req.body.newFavorite)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //block a user
  router.put("/blocks", (req, res) => {
    apiQueries
      .insertNewBlock(req.body.newBlock)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //cancel a like
  router.put("/deleteFavorite", (req, res) => {
    apiQueries
      .deleteFavorite(req.body.newFavorite)
      .then((data) => {
        console.log("data", data);
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
