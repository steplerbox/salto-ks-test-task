import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';
import CircularProgress from '@material-ui/core/CircularProgress';

import { login } from '../store/auth';

export default function AuthPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });

    dispatch(login(code));

    history.push('/');
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <CircularProgress/>
    </div>
  );
}
