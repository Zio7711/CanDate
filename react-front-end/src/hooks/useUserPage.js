import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useUserPage() {
  const [state, setState] = useState({
    users: [],
    interests: [],
  });

  useEffect(() => {
    Promise.all([axios.get('/api/users'), axios.get('/api/interests')]).then(
      (res) => {
        console.log('res', res);
        setState({
          users: res[0].data.users,
          interests: res[1].data.interests,
        });
      }
    );
  }, []);

  return { state };
}
