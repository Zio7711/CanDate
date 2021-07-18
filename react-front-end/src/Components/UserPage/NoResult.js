import React from 'react';
import './NoResult.scss';
const NoResult = () => {
  return (
    <div className="no_result">
      <img
        src="https://github.com/MattLuo90/CanDate/blob/debug/selectid/react-front-end/public/images/search.png?raw=true"
        alt="search"
      />
      <h2>Sorry No Result Found</h2>
      <p>We have searched all users in database</p>
      <p>
        We did not find any matches for you. Please select some other filters
      </p>
    </div>
  );
};

export default NoResult;
