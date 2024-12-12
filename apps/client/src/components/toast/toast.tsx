import { FC, PropsWithChildren } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import styles from './toast.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import { ToastType } from '../../store';
interface Props {
  toast: ToastType;
}

export const Toast: FC<Props & PropsWithChildren> = ({ toast }) => {
  const backgroundColor = 'transparent';
  const iconColor = '#29353c';
  const iconStyles = {
    backgroundColor: backgroundColor,
    fill: iconColor,
    '&:hover': { cursor: 'pointer' },
    paddingRight: '0.6rem',
    paddingLeft: '0.6rem',
  };
  return (
    <div className={styles.toast}>
      <div className={styles.user}>
        <PersonIcon sx={{ backgroundColor: 'transparent', fill: iconColor }} />
        {'username'}
      </div>

      <p> {toast.reason} </p>

      <div className={styles.date}>
        <p> {toast.toastDate.toUTCString().replace('GMT', '')}</p>
      </div>

      <DeleteIcon sx={iconStyles} />
      <EditIcon sx={iconStyles} />

      <InfoIcon sx={iconStyles} />
    </div>
  );
};
