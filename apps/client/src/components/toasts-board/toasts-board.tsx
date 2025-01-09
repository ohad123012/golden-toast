import { FC, PropsWithChildren, useState } from 'react';
import { Board } from '../board';
import { Toast } from '../toast';
import {
  RootState,
  useAppSelector,
  useGetAllFutureToastsForUserQuery,
  useGetAllFutureToastsQuery,
  useGetAllPastToastsQuery,
  useGetPastToastForUserQuery,
} from '../../store';

import styles from './toasts-board.module.css';

export const ToastsBoard: FC = () => {
  const [getPastToasts, setGetPastToasts] = useState<boolean>(false);

  const user = useAppSelector((state: RootState) => state.user.value);

  const { data: futureToastsForUser, isLoading: isLoadingToasts } =
    useGetAllFutureToastsForUserQuery(user?.id ?? ' ', {
      skip: Boolean(!user),
    });
  const { data: pastToastsForUser } = useGetPastToastForUserQuery(
    user?.id ?? ' ',
    {
      skip: Boolean(!user),
    }
  );

  const { data: allPastToastForAdmin } = useGetAllPastToastsQuery();

  const { data: allFutureToastsForAdmin } = useGetAllFutureToastsQuery();

  if (isLoadingToasts) {
    return <div> ....Loading</div>;
  }

  const displayContent = () => {
    if (user) {
      if (user.isAdmin) {
        if (allFutureToastsForAdmin && !getPastToasts) {
          if (allFutureToastsForAdmin.length !== 0) {
            return (
              <div className={styles.toastsContainer}>
                {allFutureToastsForAdmin.map((futureToastForAdmin) => {
                  return <Toast toast={futureToastForAdmin} user={user} />;
                })}
              </div>
            );
          } else {
            return (
              <div className={styles.noToastsWarning}>
                no future toasts for admin to show
              </div>
            );
          }
        } else if (allPastToastForAdmin && getPastToasts) {
          if (allPastToastForAdmin.length !== 0) {
            return (
              <div className={styles.toastsContainer}>
                {allPastToastForAdmin.map((pastToastForAdmin) => {
                  return <Toast toast={pastToastForAdmin} user={user} />;
                })}
              </div>
            );
          } else {
            return (
              <div className={styles.noToastsWarning}>
                no past toasts for admin to show
              </div>
            );
          }
        }
      } else {
        if (futureToastsForUser && !getPastToasts) {
          if (futureToastsForUser.length !== 0) {
            return (
              <div className={styles.toastsContainer}>
                {futureToastsForUser.map((futureToast) => {
                  return <Toast toast={futureToast} user={user} />;
                })}
              </div>
            );
          } else {
            return (
              <div className={styles.noToastsWarning}>
                no future toasts for user to show
              </div>
            );
          }
        } else if (pastToastsForUser && getPastToasts) {
          if (pastToastsForUser.length !== 0) {
            return (
              <div className={styles.toastsContainer}>
                {pastToastsForUser.map((pastToast) => {
                  return <Toast toast={pastToast} user={user} />;
                })}
              </div>
            );
          } else {
            return (
              <div className={styles.noToastsWarning}>
                no past toasts for user to show
              </div>
            );
          }
        }
      }
    } else {
      return <div className={styles.noToastsWarning}>no user logged in!</div>;
    }
  };
  return (
    <Board
      gridArea="toasts"
      title="Toasts"
      getPastToasts={getPastToasts}
      setGetPastToasts={setGetPastToasts}
    >
      {displayContent()}
    </Board>
  );
};
