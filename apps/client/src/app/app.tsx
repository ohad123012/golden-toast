import { Board, ButtonsMenu, SearchBar, ToastsBoard } from '../components';

import 'react-toastify/dist/ReactToastify.css';
import styles from './app.module.css';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <Board gridArea="results" title="Leaderboard" />
      <ToastsBoard />
      <Board gridArea="criminals" title="Criminals" />
      <ButtonsMenu />
      <Board gridArea="personaNonGrata" title="Persona non grata" />
    </div>
  );
};
