import { Settings, Person } from '@mui/icons-material';
import styles from './buttons-container.module.css';
import { RootState, useAppSelector } from '../../store';
import {
  ChangeCredentialsModal,
  LogInModal,
  SettingsModal,
} from '../../modals';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { settingsStyle, userStyle } from '../../store';

export const ButtonsContainer: React.FC = ({}) => {
  const user = useAppSelector((state: RootState) => state.user).value;

  const [openLogIn, setOpenLogIn] = useState<boolean>(false);
  const [openChangeCredentials, setOpenChangeCredentials] =
    useState<boolean>(false);

  const [openSettings, setOpenSettings] = useState<boolean>(false);
  return (
    <div className={styles.buttonsContainer}>
      {user ? (
        <IconButton
          sx={settingsStyle}
          size="large"
          onClick={() => setOpenSettings(true)}
        >
          <Settings fontSize={'large'} />
        </IconButton>
      ) : (
        ''
      )}
      {user ? (
        <IconButton
          sx={userStyle}
          onClick={() => setOpenChangeCredentials(true)}
        >
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
        <LogInModal openFromApp={openLogIn} setOpenFromApp={setOpenLogIn} />
      )}
      {openChangeCredentials && (
        <ChangeCredentialsModal
          openFromApp={openChangeCredentials}
          setOpenFromApp={setOpenChangeCredentials}
        />
      )}
      {openSettings && (
        <SettingsModal
          openFromApp={openSettings}
          setOpenFromApp={setOpenSettings}
          logInState={openLogIn}
          setLogInState={setOpenLogIn}
        />
      )}
    </div>
  );
};
