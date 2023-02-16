import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import browserHistory from './browser-history';

import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <App />
    </HistoryRouter>
  </StrictMode>,
);
