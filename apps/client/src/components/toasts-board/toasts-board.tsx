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
interface Props {}

export const ToastsBoard: FC<Props & PropsWithChildren> = ({}) => {
  const [getPastToasts, setGetPastToasts] = useState<boolean>(false);

  const user = useAppSelector((state: RootState) => state.user).value;

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

  return (
    <Board
      gridArea="toasts"
      title="Toasts"
      getPastToasts={getPastToasts}
      setGetPastToasts={setGetPastToasts}
    >
      {user ? (
        user.isAdmin ? (
          allFutureToastsForAdmin && getPastToasts === false ? (
            <div className={styles.toastsContainer}>
              {allFutureToastsForAdmin.map((futureToastForAdmin) => {
                return <Toast toast={futureToastForAdmin} user={user} />;
              })}
            </div>
          ) : allPastToastForAdmin && getPastToasts === true ? (
            <div className={styles.toastsContainer}>
              {allPastToastForAdmin.map((pastToastForAdmin) => {
                return <Toast toast={pastToastForAdmin} user={user} />;
              })}
            </div>
          ) : (
            <> error </>
          )
        ) : futureToastsForUser && getPastToasts === false ? (
          <div className={styles.toastsContainer}>
            {futureToastsForUser.map((futureToast) => {
              return <Toast toast={futureToast} user={user} />;
            })}
          </div>
        ) : pastToastsForUser && getPastToasts === true ? (
          <div className={styles.toastsContainer}>
            {pastToastsForUser.map((pastToast) => {
              return <Toast toast={pastToast} user={user} />;
            })}
          </div>
        ) : (
          <>error</>
        )
      ) : (
        <>not logged in </>
      )}
    </Board>
  );
};
