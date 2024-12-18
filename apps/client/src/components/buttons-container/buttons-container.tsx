import { Settings, Person } from '@mui/icons-material';
import styles from './buttons-container.module.css';
import { RootState, useAppSelector } from '../../store';
import { LogInModal } from '../../modals';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { settingsStyle, userStyle } from '../../store';

export const ButtonsContainer: React.FC = ({}) => {
  const user = useAppSelector((state: RootState) => state.user).value;

  const [openLogIn, setOpenLogIn] = useState<boolean>(false);

  return (
    <div className={styles.buttonsContainer}>
      {user ? (
        <IconButton sx={settingsStyle} size="large">
          <Settings fontSize={'large'} />
        </IconButton>
      ) : (
        ''
      )}
      {user ? (
        <IconButton sx={userStyle}>
          <Person />
          {user.username}
        </IconButton>
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
