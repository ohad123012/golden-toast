import { Board, ButtonsContainer, SearchBar, ToastsBoard } from '../components';
import { LogInModal } from '../modals';
import styles from './app.module.css';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <LogInModal />

      <div className={styles.searchBar}>
        <SearchBar />
      </div>

      <Board gridArea="results" title="Leaderboard" />
      <ToastsBoard />
      <Board gridArea="criminals" title="Criminals" />
      <ButtonsContainer />
      <Board gridArea="personaNonGrata" title="persona non grata" />
    </div>
  );
};
