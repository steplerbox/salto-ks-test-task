import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  listItem: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2)
  },
  listItemLink: {
    fontSize: theme.typography.h6.fontSize,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  stargazersCount: {
    display: 'inline-flex',
    verticalAlign: 'middle'
  },
  stargazersCountIcon: {
    color: theme.palette.grey[500],
    fontSize: theme.typography.subtitle1.fontSize,
    marginRight: theme.spacing(1)
  }
}));

export default function RepositoriesListItem({ repository }) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Link className={classes.listItemLink} to={`/${repository.full_name}`}>
            {repository.full_name}
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2'>
            {repository.description}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <StarIcon className={`${classes.stargazersCount} ${classes.stargazersCountIcon}`} />
          <Typography className={classes.stargazersCount} variant='caption' color='textSecondary'>
            {repository.stargazers_count}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='caption' color='textSecondary'>
            {`${t('updated')} ${moment(repository.updated_at).local().format('D MMM YYYY')}`}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}

