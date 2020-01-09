import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { languages } from '../../i18n';
import { logout } from '../store/auth';

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(1)
  },
  language: {
    color: 'inherit',
    marginRight: theme.spacing(2)
  },
  languageSelect: {
    fontSize: theme.typography.fontSize,
    padding: theme.spacing(1, 3, 1, 1),
    textTransform: 'uppercase',
    '&:focus': {
      backgroundColor: 'unset'
    }
  },
  languageIcon: {
    color: 'inherit'
  },
  rightAlignedContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto'
  }
}));

export default function AppBar({ children }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const { isAuthenticated, isUserLoading, isTokenLoading, user: {avatar_url} } = useSelector(store => store.auth);

  function handleLoginClick() {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${config.gitHubClientId}&scope=repo`,
      '_self'
    );
  }

  function handleLogoutClick() {
    dispatch(logout());
  }

  function handleLanguageChange(e) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <MaterialAppBar position='static'>
      <Toolbar>
        {children}

        <div className={classes.rightAlignedContainer}>
          <Select
            input={<InputBase classes={{ root: classes.language }}/>}
            classes={{
              icon: classes.languageIcon,
              select: classes.languageSelect
            }}
            value={i18n.language.slice(0, 2)}
            onChange={handleLanguageChange}
          >
            {languages.map(language => <MenuItem
              key={language.key}
              value={language.key}
            >
              {language.displayValue}
            </MenuItem>)}
          </Select>

          {avatar_url && <Avatar className={classes.avatar} src={avatar_url}/>}

          <Button
            color='inherit'
            onClick={isAuthenticated ? handleLogoutClick : handleLoginClick}
          >
            {isUserLoading || isTokenLoading
              ? <CircularProgress color='inherit'/>
              : isAuthenticated
                ? t('logout')
                : t('login')}
          </Button>
        </div>
      </Toolbar>
    </MaterialAppBar>
  );
}
