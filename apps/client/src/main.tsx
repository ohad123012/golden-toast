import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './app';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
