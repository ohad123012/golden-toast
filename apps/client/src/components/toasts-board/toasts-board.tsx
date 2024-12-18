import { FC } from 'react';
import { Board } from '../board';
import { Toast } from '../toast';
import {
  RootState,
  ToastType,
  useAppSelector,
  useGetAllFutureToastsForUserQuery,
} from '../../store';

import styles from './toasts-board.module.css';

export const ToastsBoard: FC = (PropsWithChildren) => {
  const user = useAppSelector((state: RootState) => state.user).value;

  const {
    data: futureToasts,
    isLoading: isLoadingToasts,
    isSuccess: isSuccessfulToasts,
  } = useGetAllFutureToastsForUserQuery(user?.id ?? '');

  if (isLoadingToasts) {
    console.log('loading');
    return <div> ....Loading</div>;
  }
  if (isSuccessfulToasts && futureToasts) {
    return (
      <Board gridArea="toasts" title="Toasts">
        {user ? (
          <div className={styles.toastsContainer}>
            {futureToasts.map((futureToast) => {
              return <Toast toast={futureToast} />;
            })}
          </div>
        ) : (
          <div className={styles.noToastsHeader}>
            {' '}
            Please log in to see toasts!
          </div>
        )}
      </Board>
    );
  }
};
