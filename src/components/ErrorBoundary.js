import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import PageWrapper from './PageWrapper';

export default class ErrorBoundary extends Component {
  state = {
    error: ''
  };

  static getDerivedStateFromError(error) {
    return {error};
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (this.state.error) {
      return (
        <PageWrapper>
          <Typography align='center' variant='h4' color='textSecondary'>
            <Translation>
              {t => t('errorBoundaryMessage')}
            </Translation>
          </Typography>
        </PageWrapper>
      );
    }

    return this.props.children;
  }
}
