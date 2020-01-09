import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './src/App';
import createStore from './src/store/createStore';
import i18nInit from './i18n';

i18nInit().then(() => {
  render(
    <Provider store={createStore()}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
