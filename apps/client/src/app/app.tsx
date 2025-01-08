import {
  Board,
  ButtonsMenu,
  CriminalBoard,
  PersonaNonGrata,
  PersonaNonGrataBoard,
  SearchBar,
  ToastsBoard,
} from '../components';

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
      <CriminalBoard />
      <ButtonsMenu />
      <PersonaNonGrataBoard />
    </div>
  );
};
