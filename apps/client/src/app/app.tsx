// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Board } from '../components';
import styles from './app.module.css';
import { FC } from 'react';

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
    </div>
  );
};
