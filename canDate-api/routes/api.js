const express = require("express");
const router = express.Router();
const apiQueries = require("../db/queries/api_queries");

let id = 0;
const getId = () => {
  return id++;
};

module.exports = function (app) {
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

  router.put("/users", (req, res) => {
    res.json("success");
    apiQueries.createNewUser(req.body.newUser).catch((err) => {
      console.log(err);
    });
  });

  router.put("/user_tag/new", (req, res) => {
    console.log("check", req.body.newTagUser);
    apiQueries
      .newUserTag(req.body.newTagUser)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

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

  let msgWS = [];
  app.ws("/message", function (ws, req) {
    msgWS.push(ws);
    // ws.on("message", function (msg) {
    //   msgWS.forEach((eachWS) => eachWS.send("hello!"));
    // });
  });

  router.put("/signup/:id", (req, res) => {
    res.json("success");
    apiQueries.updateUser(req.body.updateUser).catch((err) => {
      console.log(err);
    });
  });

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
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
