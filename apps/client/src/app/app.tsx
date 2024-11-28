import { Board, ButtonsContainer, SearchBar } from '../components';
import styles from './app.module.css';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <Board gridArea="results" title="results" />
      <Board gridArea="toasts" title="toasts" />
      <Board gridArea="criminals" title="criminals" />
      <ButtonsContainer />
      <Board gridArea="personaNonGrata" title="persona non grata" />
    </div>
  );
};
