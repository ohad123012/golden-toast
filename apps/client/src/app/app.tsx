import { ToastContainer } from 'react-toastify';
import { Board, ButtonsContainer, SearchBar, ToastsBoard } from '../components';
import { LogInModal } from '../modals';
import { RootState, useAppSelector } from '../store';
import 'react-toastify/dist/ReactToastify.css';

import styles from './app.module.css';
import { FC } from 'react';

export const App: FC = () => {
  const user = useAppSelector((state: RootState) => state.user).value;

  console.log(user?.password, user?.username);
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
      <button> please log in </button>
    </div>
  );
};
