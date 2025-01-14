import { Dispatch, PropsWithChildren, useState } from 'react';
import { AddCircleOutline, HistoryToggleOff } from '@mui/icons-material';
import styles from './board.module.css';

import { RootState, useAppSelector } from '../../store';
import { IconButton } from '@mui/material';
import { CreateToastModal } from '../../modals';
interface Props {
  title?: string;
  gridArea?: string;
  getPastToasts?: boolean;
  setGetPastToasts?: Dispatch<React.SetStateAction<boolean>>;
}
export const Board: React.FC<Props & PropsWithChildren> = ({
  gridArea,
  title,
  children,
  getPastToasts,
  setGetPastToasts,
}) => {
  const titleColors = '#e6e6e6';
  const pastToastButtonPressed = {
    color: '#007BFF',
    paddingTop: '3.5%',
    height: '2rem',
    width: '2rem',
    '&:hover': { transform: 'scale(1.2)' },
  };
  const pastToastButtonNotPressed = {
    color: titleColors,
    paddingTop: '3.5%',
    height: '2rem',
    width: '2rem',
    '&:hover': { transform: 'scale(1.2)' },
  };

  const [openAddToast, setOpenAddToast] = useState<boolean>(false);
  const user = useAppSelector((state: RootState) => state.user.value);
  user;
  const showTitles = title !== 'Toasts' || (title === 'Toasts' && !user);
  return (
    <div className={styles.box} style={{ gridArea }}>
      {title === 'Toasts' && user && (
        <div className={styles.board}>
          <div className={styles.titleButtonBox}>
            <div className={styles.historyButton}>
              <IconButton
                onClick={() => {
                  if (setGetPastToasts) {
                    setGetPastToasts(!getPastToasts);
                  }
                }}
              >
                <HistoryToggleOff
                  sx={
                    getPastToasts
                      ? pastToastButtonPressed
                      : pastToastButtonNotPressed
                  }
                />
              </IconButton>
            </div>
            <div className={styles.toastTitle}>{title}</div>
            <IconButton onClick={() => setOpenAddToast(true)}>
              <AddCircleOutline
                sx={{
                  color: titleColors,
                  paddingTop: '3.5%',
                  height: '2rem',
                  width: '2rem',
                  '&:hover': { transform: 'scale(1.2)' },
                }}
              />
            </IconButton>
          </div>
        </div>
      )}
      {showTitles && <div className={styles.title}>{title}</div>}
      {children}
      {openAddToast && (
        <CreateToastModal
          openModal={openAddToast}
          setOpenModal={setOpenAddToast}
        />
      )}
    </div>
  );
};
