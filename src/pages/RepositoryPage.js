import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/AppBar';
import PageWrapper from '../components/PageWrapper';
import { getRepository, clearRepositoryData } from '../store/repository';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}));

function sectionTitle(title) {
  return (
    <Grid item xs={12}>
      <Typography variant='h6' color='textSecondary'>
        {title}
      </Typography>
    </Grid>
  );
}

function dataItem(caption, data) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={2}>
        <Typography variant='caption' color='textSecondary'>
          {caption}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant='body2'>
          {data}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default function RepositoryPage({match: {params: { userName, repositoryName }}}) {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, data, owner, error } = useSelector(store => store.repository);

  useEffect(() => {
    dispatch(getRepository(userName, repositoryName));

    return () => dispatch(clearRepositoryData());
  }, []);

  function renderContent() {
    if (isLoading) {
      return (
        <div style={{textAlign: 'center'}}>
          <CircularProgress/>
        </div>
      )
    }

    if (error) {
      return (
        <Typography variant='h6' color='error'>
          {t(error)}
        </Typography>
      )
    }

    return (
      <Grid container spacing={3}>

        {sectionTitle(t('ownerDetails'))}

        <Grid item xs={2}>
          <Avatar className={classes.avatar} src={owner.avatar_url}/>
        </Grid>

        <Grid item xs={10}>
          {owner.html_url && dataItem(
            t('gitHubPage'),
            <Link target='_blank' href={owner.html_url}>{owner.html_url}</Link>
          )}
          {dataItem(t('type'), owner.type)}
          {dataItem(t('name'), owner.login)}
        </Grid>

        {sectionTitle(t('repositoryDetails'))}

        <Grid item xs={12}>
          {data.html_url && dataItem(
            t('gitHubPage'),
            <Link target='_blank' href={data.html_url}>{data.html_url}</Link>
          )}
          {dataItem(t('description'), data.description)}
          {dataItem(t('stars'), data.stargazers_count)}
          {dataItem(t('updated'), moment(data.updated_at).local().format('D MMM YYYY'))}
        </Grid>

      </Grid>
    );
  }

  return (
    <>
      <AppBar>
        <Typography variant='h6' color='inherit'>
          {`${userName}/${repositoryName}`}
        </Typography>
      </AppBar>

      <PageWrapper>
        {renderContent()}
      </PageWrapper>
    </>
  );
}
