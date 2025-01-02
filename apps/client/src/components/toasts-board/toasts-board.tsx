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

  const { data: futureToasts, isLoading: isLoadingToasts } =
    useGetAllFutureToastsForUserQuery(user?.id ?? ' ', {
      skip: Boolean(!user),
    });

  console.log(futureToasts);
  if (isLoadingToasts) {
    return <div> ....Loading</div>;
  }

  return (
    <Board gridArea="toasts" title="Toasts">
      {futureToasts && user ? (
        <div className={styles.toastsContainer}>
          {futureToasts.map((futureToast) => {
            return <Toast toast={futureToast} />;
          })}
        </div>
      ) : (
        <div className={styles.noToastsWarning}>
          Please log in to see toasts!
        </div>
      )}
    </Board>
  );
};
