import { FC, PropsWithChildren } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import styles from './toast.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import {
  RootState,
  ToastType,
  useAppSelector,
  useGetUserByUserIdQuery,
} from '../../store';
interface Props {
  toast: ToastType;
}

export const Toast: FC<Props & PropsWithChildren> = ({ toast }) => {
  const { data: userForToast } = useGetUserByUserIdQuery(toast.userId);
  const backgroundColor = 'transparent';
  const iconColor = '#29353c';
  const iconStyles = {
    backgroundColor: backgroundColor,
    fill: iconColor,
    '&:hover': { cursor: 'pointer' },
    padding: '0 0.6rem',
  };

  return (
    <div className={styles.toast}>
      <div className={styles.user}>
        <PersonIcon sx={{ backgroundColor: 'transparent', fill: iconColor }} />
        {userForToast?.username}
      </div>

      <p> {toast.reason} </p>

      <div className={styles.date}>
        <p> {new Date(toast.toastDate).toUTCString().replace('GMT', '')}</p>
      </div>

      <DeleteIcon sx={iconStyles} />
      <EditIcon sx={iconStyles} />
      <InfoIcon sx={iconStyles} />
    </div>
  );
};
