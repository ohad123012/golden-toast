import { Board, ButtonsContainer, SearchBar, ToastsBoard } from '../components';
import styles from './app.module.css';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <Board gridArea="results" title="Results" />
      <ToastsBoard />
      <Board gridArea="criminals" title="Criminals" />
      <ButtonsContainer />
      <Board gridArea="personaNonGrata" title="persona non grata" />
    </div>
  );
};
