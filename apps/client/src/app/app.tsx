import { Board, ButtonsContainer, SearchBar, ToastsBoard } from '../components';
import { LogInModal } from '../modals';
import 'react-toastify/dist/ReactToastify.css';
import styles from './app.module.css';
import { FC, useState } from 'react';

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <Board gridArea="results" title="Leaderboard" />
      <ToastsBoard />
      <Board gridArea="criminals" title="Criminals" />
      <ButtonsContainer />
      <Board gridArea="personaNonGrata" title="Persona non grata" />
    </div>
  );
};
