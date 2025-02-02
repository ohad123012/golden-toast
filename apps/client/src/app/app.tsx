import {
  Board,
  ButtonsMenu,
  CriminalBoard,
  Leaderboard,
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
      <Leaderboard />
      <ToastsBoard />
      <CriminalBoard />
      <ButtonsMenu />
      <PersonaNonGrataBoard />
    </div>
  );
};
