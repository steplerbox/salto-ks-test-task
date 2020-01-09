import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(3)
  }
}));

export default function PageWrapper({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {children}
    </div>
  );
}
