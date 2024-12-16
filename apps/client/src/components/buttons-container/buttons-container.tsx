import { MeetingRoom, Settings } from '@mui/icons-material';
import { ActionIconButton } from '../action-icon-button';
import styles from './buttons-container.module.css';
import { RootState, useAppDispatch, useAppSelector } from '../../store';
import { LogInModal } from '../../modals';
import { useState } from 'react';
import { IconButton } from '@mui/material';

export const ButtonsContainer: React.FC = ({}) => {
  const user = useAppSelector((state: RootState) => state.user).value;
  const dispatch = useAppDispatch();

  const [openLogIn, setOpenLogIn] = useState<boolean>(false);

  return (
    <div className={styles.buttonsContainer}>
      {user ? <ActionIconButton Icon={Settings} /> : ''}
      {user ? (
        <button className={styles.upperButton}> {user.username} </button>
      ) : (
        <button
          className={styles.upperButton}
          onClick={() => setOpenLogIn(true)}
        >
          Log in / Sign up
        </button>
      )}
      {openLogIn && (
        <LogInModal OpenFromApp={openLogIn} setOpenFromApp={setOpenLogIn} />
      )}
    </div>
  );
};
