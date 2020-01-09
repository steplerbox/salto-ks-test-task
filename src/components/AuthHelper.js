import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { getAuthenticatedUser, clearAuthData } from '../store/auth';

export default function AuthHelper() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const error = useSelector(store => store.auth.error);

  useEffect(() => {
    if (cookies.get('token')) {
      dispatch(getAuthenticatedUser());
    }
  }, []);

  function handleErrorNotificationClose(e, reason) {
    if (!error || reason === 'clickaway') {
      return;
    }
    dispatch(clearAuthData());
  }

  return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={handleErrorNotificationClose}
      >
        <Alert color='error' onClose={handleErrorNotificationClose}>{t(error)}</Alert>
      </Snackbar>
  );
}
