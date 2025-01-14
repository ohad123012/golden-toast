import { Settings, Person } from '@mui/icons-material';
import styles from './buttons-menu.module.css';
import { RootState, useAppSelector } from '../../store';
import {
  ChangeCredentialsModal,
  LogInModal,
  SettingsModal,
} from '../../modals';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { settingsStyle, userStyle } from '../../store';

export const ButtonsMenu: React.FC = ({}) => {
  const user = useAppSelector((state: RootState) => state.user.value);
  const adminColor = ' #76ba96';
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
          <Person
            sx={
              user.isAdmin
                ? {
                    color: adminColor,
                  }
                : {}
            }
          />
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
        <LogInModal openModal={openLogIn} setOpenModal={setOpenLogIn} />
      )}
      {openChangeCredentials && (
        <ChangeCredentialsModal
          openModal={openChangeCredentials}
          setOpenModal={setOpenChangeCredentials}
        />
      )}
      {openSettings && (
        <SettingsModal
          openModal={openSettings}
          setOpenModal={setOpenSettings}
          setLogInState={setOpenLogIn}
          user={user}
        />
      )}
    </div>
  );
};
