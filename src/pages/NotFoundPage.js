import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import AppBar from '../components/AppBar';
import PageWrapper from '../components/PageWrapper';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <AppBar />

      <PageWrapper>
        <Typography align='center' variant='h4' color='textSecondary' gutterBottom>
          {t('notFound')}
        </Typography>
        <Typography align='center' variant='h6' color='textSecondary'>
          {t('backLinkText1')}
          <Link to={'/'}>
            {t('backLinkText2')}
          </Link>
          {t('backLinkText3')}
        </Typography>
      </PageWrapper>
    </>
  );
}
