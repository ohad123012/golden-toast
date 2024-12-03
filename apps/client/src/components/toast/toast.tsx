import { FC, PropsWithChildren } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import styles from './toast.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
export interface ToastType {
  id: string;
  userId: string;
  toastDate: Date;
  reason: string;
  drinks: string;
  foods: string;
  description: string;
  hasDone: boolean;
}
interface Props {
  toast: ToastType;
}

export const Toast: FC<Props & PropsWithChildren> = ({ toast }) => {
  const backgroundColor = 'transparent';

  const iconStyles = {
    backgroundColor: backgroundColor,
    fill: '#29353c',
    '&:hover': { cursor: 'pointer' },
    paddingRight: '0.6rem',
    paddingLeft: '0.6rem',
  };
  return (
    <div className={styles.toast}>
      <div className={styles.user}>
        <PersonIcon sx={{ backgroundColor: 'transparent', fill: '#29353c' }} />
        {'username'}
      </div>

      <p> {toast.reason} </p>

      <div className={styles.date}>
        <p> {toast.toastDate.toUTCString()}</p>
      </div>

      <DeleteIcon sx={iconStyles} />
      <EditIcon sx={iconStyles} />

      <InfoIcon sx={iconStyles} />
    </div>
  );
};
