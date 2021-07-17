import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/HomePage/Home';
import Message from './Components/Message/Message';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TimeAgo from 'javascript-time-ago';
import bcrypt from 'bcryptjs';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
import UserPage from './Components/UserPage/UserPage';

const ENDPOINT = 'ws://localhost:8080/message';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

let realTimeData;
function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tags, setTags] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [block, setBlock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user_tag, setUserTags] = useState([]);
  useEffect(() => {
    const socket = new WebSocket(ENDPOINT);
    socket.onmessage = function (event) {
      realTimeData = event.data;

      if (messages.length !== 0 && realTimeData) {
        // const needToSet = [...messages, ...JSON.parse(realTimeData)];

        // setMessages(needToSet);
        const parsedData = JSON.parse(realTimeData);
        setMessages((prev) => [...prev, ...parsedData]);
      }
    };

    // socket.onclose = function () {
    //   console.log('Close');
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    Promise.all([
      axios.get('/api/users'),
      axios.get('/api/message'),
      axios.get('/api/tags'),
      axios.get('/api/favorite'),
      axios.get('/api/user_tag'),
      axios.get('/api/block'),
    ])
      .then((all) => {
        const [user, message, tag, favorite, user_tag, block] = all;
        setUsers(user.data.users);
        setMessages(message.data.message);
        setTags(tag.data.tags);
        setFavorite(favorite.data.favorites);
        setUserTags(user_tag.data.user_tag);
        setBlock(block.data.block);
        setTimeout(function () {
          setLoading(false);
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // console.log('favorite', favorite);

  const findPasswordByEmail = (email, users) => {
    const arr = [];
    for (const user of users) {
      if (user.email === email) {
        arr.push(user.password);
        arr.push(user.id);
      }
    }

    checkPassword(arr[0], arr[1]);
  };

  const checkPassword = (password, id) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    if (bcrypt.compareSync(password, hashedPassword)) {
      window.location.replace(`http://localhost:3002/user/${id}`);
      return;
    }
    return false;
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/users/:id/message">
            <Message
              messages={messages}
              users={users}
              setMessages={setMessages}
              loading={loading}
              realTimeData={realTimeData}
              favorite={favorite}
              block={block}
            />
          </Route>
          <Route path="/profile">
            <p>PROFILE PAGE</p>
          </Route>

          <Route path="/user/:id">
            <UserPage
              users={users}
              tags={tags}
              user_tag={user_tag}
              loading={loading}
              messages={messages}
              setMessages={setMessages}
              // zio add for testing
              realTimeData={realTimeData}
              favorite={favorite}
              block={block}
              setFavorite={setFavorite}
              setBlock={setBlock}
            />
          </Route>

          <Route path="/">
            <Home
              image={users}
              tags={tags}
              checkPassword={checkPassword}
              findPasswordByEmail={findPasswordByEmail}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
