import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import Grid from '@material-ui/core/Grid';
import './UserPage.scss';
import NavBar from './NavBar';
import {
  filterTags,
  getNameOfTag,
  getFilteredUsersByInterest,
  getFilteredUsersByAge,
  getLoggedInUserInfo,
  getFilteredUsersByCity,
  userIdWithTagsArrObj,
  getFilteredUsersByGender,
  getUserIdWithMatchPointObj,
  getSortedUsers,
} from '../../helpers/userPageHelpers';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  getFavoriteByUser,
  getUserIBlock,
  getUsersByBlocked,
} from '../../helpers/favoriteBlockHelp';
import Status from '../HomePage/Status';
import NoResult from './NoResult';
import Footer from './Footer';

const UserPage = (props) => {
  const {
    users,
    user_tag,
    tags,
    loading,
    messages,
    setMessages,
    realTimeData,
    favorite,
    block,
    setFavorite,
    setBlock,
  } = props;

  let { id } = useParams();
  const [loggedInUserInfo, setLoggedInUserInfo] = useState([]);
  const [startNum, setStartNum] = useState(0);
  const [endNum, setEndNum] = useState(3);
  const [checkedA, setCheckedA] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const [state, setState] = useState({
    tags: [],
    ageRange: [20, 80],
    city: [],
    gender: '',
    favorite: false,
    loginUserTags: [],
  });

  //set initial filter state when data is loaded from the database
  useEffect(() => {
    if (users.length !== 0) {
      setLoggedInUserInfo((prev) => [...prev, ...neededInfo]);
      setState({
        ...state,
        tags: [],
        city: [],
        gender: neededInfo[0].gender,
        loginUserTags: LoggedInUserTagIDs,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const neededInfo = getLoggedInUserInfo(id, users);
  const LoggedInUserTagIDs = filterTags(Number(id), user_tag);
  const filteredFavoriteId = getFavoriteByUser(favorite, Number(id));
  const filteredUserIBlockId = getUserIBlock(block, Number(id));
  const filteredFavoriteUsers = filteredFavoriteId.map((id) => users[id - 1]);

  const updateAgeRange = (event, data) => {
    const selectArr = { ...state };
    selectArr.ageRange = data;
    setState(selectArr);
  };

  //event handler functions
  const handleMessageClose = (e) => {
    e.stopPropagation();
    setOpenMsg(false);
  };
  const handleMessageOpen = (e) => {
    e.stopPropagation();
    setOpenMsg(true);
  };

  // add selected tag id into state
  const handleTagClick = (itemId) => {
    const selectArr = { ...state };

    if (selectArr.tags.includes(itemId)) {
      const index = selectArr.tags.indexOf(itemId);
      selectArr.tags.splice(index, 1);
    } else {
      selectArr.tags.push(itemId);
    }

    setState(selectArr);
  };

  // add selected address into state
  const handleAddressClick = (city) => {
    const selectArr = { ...state };
    if (selectArr.city.includes(city)) {
      const index = selectArr.city.indexOf(city);
      selectArr.city.splice(index, 1);
    } else {
      selectArr.city.push(city);
    }
    setState(selectArr);
  };

  //clear filter event handler function
  const handleEmptyTagsClick = (state) => {
    const selectArr = {
      ...state,
      tags: [],
      city: [],
      ageRange: [0, 100],
      gender: '',
      loginUserTags: LoggedInUserTagIDs,
    };
    setState(selectArr);
    setCheckedA(false);
  };

  //show only favorite or all users
  const handleFavorite = () => {
    if (state.favorite) {
      setState({
        ...state,
        tags: [],
        city: [],
        ageRange: [20, 80],
        gender: neededInfo[0].gender,
        favorite: false,

        loginUserTags: LoggedInUserTagIDs,
      });
    } else {
      setEndNum(3);
      setStartNum(0);
      setState({
        ...state,
        tags: [],
        city: [],
        ageRange: [20, 80],
        gender: '',
        favorite: true,
      });
    }
  };

  const userTagObj = userIdWithTagsArrObj(users, user_tag);
  const matchObj = getUserIdWithMatchPointObj(
    state.loginUserTags,
    userTagObj,
    users,
    state.loginUserTags
  );

  const sortedUsers = getSortedUsers(matchObj, users);

  let filteredByTags;
  if (state.favorite) {
    filteredByTags = filteredFavoriteUsers;
  } else {
    filteredByTags = getFilteredUsersByInterest(
      state.tags,
      userTagObj,
      sortedUsers
    );
  }

  const filteredByGender = getFilteredUsersByGender(
    state.gender,
    filteredByTags
  );

  const filteredByAge = getFilteredUsersByAge(filteredByGender, state.ageRange);

  const filteredUsersByBlocked = getUsersByBlocked(
    filteredByAge,
    filteredUserIBlockId
  );

  const filteredHimself = filteredUsersByBlocked.filter(
    (user) => user.id !== Number(id)
  );

  const filteredByCity = getFilteredUsersByCity(state.city, filteredHimself);

  function addMatchPointPercentage(users, matchObj) {
    for (const user of users) {
      for (const match of matchObj) {
        if (user.id === match.userId) {
          user.percent = match.percentage;
        }
      }
    }
  }

  addMatchPointPercentage(users, matchObj);

  const handleNextButton = (num1, num2) => {
    setStartNum((num1 += 3));
    setEndNum((num2 += 3));
  };

  const handlePreviousButton = (num1, num2) => {
    setStartNum((num1 -= 3));
    setEndNum((num2 -= 3));
  };

  return loading ? (
    <Status />
  ) : (
    <div className="user">
      <NavBar
        handleTagClick={handleTagClick}
        handleAddressClick={handleAddressClick}
        handleEmptyTagsClick={handleEmptyTagsClick}
        updateAgeRange={updateAgeRange}
        ageRange={state.ageRange}
        users={users}
        name={loggedInUserInfo}
        handleFavorite={handleFavorite}
        setGender={setState}
        state={state}
        openMsg={openMsg}
        setOpenMsg={setOpenMsg}
        handleMessageClose={handleMessageClose}
        handleMessageOpen={handleMessageOpen}
        setStartNum={setStartNum}
        setEndNum={setEndNum}
        checkedA={checkedA}
        setCheckedA={setCheckedA}
        tags={tags}
      />
      <div className="user-page">
        {state.tags.length === 0 &&
        state.city.length === 0 &&
        !state.favorite &&
        state.gender === '' &&
        state.ageRange[0] === 0 ? (
          <NoResult />
        ) : filteredByCity.length === 0 ? (
          <NoResult />
        ) : (
          filteredByCity.slice(startNum, endNum).map((filteredUser) => {
            return (
              <Grid
                key={filteredUser.id}
                container
                spacing={4}
                className="user-page-ind"
              >
                <Grid key={filteredUser.id} item xs={12}>
                  <ProfileCard
                    key={filteredUser.id}
                    id={filteredUser.id}
                    name={filteredUser.first_name}
                    last_name={filteredUser.last_name}
                    city={filteredUser.address}
                    age={filteredUser.age}
                    gender={filteredUser.gender}
                    about_me={filteredUser['about_me']}
                    height={filteredUser.height}
                    address={filteredUser.address}
                    profile_photo={filteredUser.profile_photo}
                    tag={getNameOfTag(
                      filterTags(filteredUser.id, user_tag),
                      tags
                    )}
                    messages={messages}
                    setMessages={setMessages}
                    filteredFavoriteId={filteredFavoriteId}
                    users={users}
                    loading={loading}
                    realTimeData={realTimeData}
                    favorite={favorite}
                    block={block}
                    setFavorite={setFavorite}
                    setBlock={setBlock}
                    matchPercentage={filteredUser.percent}
                    openMsg={openMsg}
                    setOpenMsg={setOpenMsg}
                    handleMessageClose={handleMessageClose}
                    handleMessageOpen={handleMessageOpen}
                  />
                </Grid>
              </Grid>
            );
          })
        )}
      </div>
      <div id="user-page-button">
        {startNum > 2 && (
          <div className="wrapper-left">
            <span
              className="cta-left"
              onClick={() => handlePreviousButton(startNum, endNum)}
            >
              <span>
                <svg
                  width="66px"
                  height="43px"
                  viewBox="0 0 66 43"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g
                    id="arrow-left"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <path className="one-left" fill="#FFFFFF"></path>
                    <path className="two-left" fill="#FFFFFF"></path>
                    <path className="three-left" fill="#FFFFFF"></path>
                  </g>
                </svg>
              </span>
              <span className="button-label-left"> Prev</span>
            </span>
          </div>
        )}
        {endNum < filteredByCity.length && (
          <div className="wrapper-right">
            <span
              className="cta-right"
              onClick={() => handleNextButton(startNum, endNum)}
            >
              <span className="button-label-right">Next</span>
              <span>
                <svg
                  width="66px"
                  height="43px"
                  viewBox="0 0 66 43"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <path className="one-right" fill="#FFFFFF"></path>
                  <path className="two-right" fill="#FFFFFF"></path>
                  <path className="three-right" fill="#FFFFFF"></path>
                </svg>
              </span>
            </span>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserPage;
