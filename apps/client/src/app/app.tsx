import { Board, ButtonsContainer, SearchBar, ToastsBoard } from '../components';
import { LogInModal } from '../modals/log-in-modal';
import { SignUpModal } from '../modals/sign-up-modal';
import styles from './app.module.css';
import { FC, useState } from 'react';

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <LogInModal />

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
