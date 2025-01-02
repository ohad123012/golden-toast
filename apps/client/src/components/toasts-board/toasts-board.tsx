import { FC, useState } from 'react';
import { Board } from '../board';
import { Toast } from '../toast';
import {
  RootState,
  ToastType,
  useAppSelector,
  useGetAllFutureToastsForUserQuery,
} from '../../store';

import styles from './toasts-board.module.css';
import { skipToken } from '@reduxjs/toolkit/query';

export const ToastsBoard: FC = (PropsWithChildren) => {
  const user = useAppSelector((state: RootState) => state.user).value;
  let skip = true;

  if (user) {
    skip = false;
  }

  const { data: futureToasts, isLoading: isLoadingToasts } =
    useGetAllFutureToastsForUserQuery(user?.id ?? ' ', { skip });

  if (isLoadingToasts) {
    return <div> ....Loading</div>;
  }

  return (
    <Board gridArea="toasts" title="Toasts">
      {futureToasts ? (
        <div className={styles.toastsContainer}>
          {futureToasts.map((futureToast) => {
            return <Toast toast={futureToast} />;
          })}
        </div>
      ) : (
        <div className={styles.noToastsHeader}>
          Please log in to see toasts!
        </div>
      )}
    </Board>
  );
};
