import { Board, ButtonsContainer } from '../components';
import styles from './app.module.css';
import { FC } from 'react';

import { SearchBar } from '../components';

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <div style={{ gridArea: 'search' }}>
        <SearchBar />
      </div>
      <Board gridArea="results" title="results" />
      <Board gridArea="toasts" title="toasts" />
      <Board gridArea="criminals" title="criminals" />
      <ButtonsContainer gridArea="button" />

      <Board gridArea="personaNonGrata" title="persona non grata" />
    </div>
  );
};
