import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import debounce from 'lodash.debounce';

import AppBar from '../components/AppBar';
import PageWrapper from '../components/PageWrapper';
import RepositoriesList from '../components/RepositoriesList';
import { changePage, changeQueryString, getRepositories } from '../store/repositories';

const useStyles = makeStyles(theme => ({
  searchInputWrapper: {
    marginRight: theme.spacing(2)
  },
  searchIcon: {
    margin: theme.spacing(0, 2),
    verticalAlign: 'middle'
  }
}));

export default function ExplorePage() {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const repositories = useSelector(store => store.repositories);

  const debouncedChangeQueryString = debounce(function(queryString) {
    dispatch(changeQueryString(queryString));
    dispatch(changePage(0));
    dispatch(getRepositories(queryString, 0, repositories.rowsPerPage));
  }, 500);

  function handleSearchInputChange(e) {
    debouncedChangeQueryString(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      dispatch(getRepositories(repositories.queryString, repositories.page, repositories.rowsPerPage));
    }
  }

  function handleChangePage(e, page) {
    dispatch(changePage(page));
    dispatch(getRepositories(repositories.queryString, page, repositories.rowsPerPage));
  }

  function renderContent() {
    if (repositories.isLoading) {
      return (
        <div style={{textAlign: 'center'}}>
          <CircularProgress/>
        </div>
      );
    }

    if (repositories.error) {
      return (
        <Typography variant='h6' color='error'>
          {t(repositories.error)}
        </Typography>
      );
    }

    if (repositories.totalCount) {
      return (
        <RepositoriesList
          items={repositories.items}
          totalCount={repositories.totalCount}
          page={repositories.page}
          rowsPerPage={repositories.rowsPerPage}
          onChangePage={handleChangePage}
        />
      );
    }

    if (repositories.queryString) {
      return (
        <Typography variant='h6' color='textSecondary'>
          {t('noResultsPlaceholder', { queryString: repositories.queryString })}
        </Typography>
      );
    }

    return (
      <Typography variant='h6' color='textSecondary'>
        {t('noQueryStringPlaceholder')}
      </Typography>
    );
  }

  return (
    <>
      <AppBar>
        <Paper className={classes.searchInputWrapper}>
          <SearchIcon className={classes.searchIcon} />
          <InputBase
            placeholder={t('searchInputPlaceholder')}
            defaultValue={repositories.queryString}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
          />
        </Paper>
        <Typography variant='h6' color='inherit'>
          {t('searchResultsCount', { count: repositories.totalCount })}
        </Typography>
      </AppBar>

      <PageWrapper>
        {renderContent()}
      </PageWrapper>
    </>
  );
}
