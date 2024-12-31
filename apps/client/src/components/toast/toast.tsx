import { FC, PropsWithChildren } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import styles from './toast.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import {
  ToastType,
  useDeleteToastMutation,
  useGetUserByUserIdQuery,
  useDeleteAllToastParticipantsForToastIdMutation,
} from '../../store';
import { IconButton } from '@mui/material';

interface Props {
  toast: ToastType;
}

export const Toast: FC<Props & PropsWithChildren> = ({ toast }) => {
  const { data: userForToast } = useGetUserByUserIdQuery(toast.userId);
  const [deleteToast] = useDeleteToastMutation();
  const [deleteToastParticipants] =
    useDeleteAllToastParticipantsForToastIdMutation();
  const backgroundColor = 'transparent';
  const iconColor = '#29353c';
  const iconStyles = {
    backgroundColor: backgroundColor,
    fill: iconColor,

    '&:hover': { cursor: 'pointer' },
    padding: '0 0.6rem',
  };
  const buttonStyle = {
    width: 0,
    height: 0,
    margin: '0 0.8rem',
    marginBottom: '0.85rem',
    '&:hover': {
      backgroundColor: backgroundColor,
      fill: iconColor,
      cursor: 'pointer',
    },
  };
  const handleDeleteToast = () => {
    deleteToast(toast.id);
    deleteToastParticipants(toast.id);
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

      <IconButton
        sx={buttonStyle}
        disableRipple
        onClick={() => handleDeleteToast()}
      >
        <DeleteIcon sx={iconStyles} />
      </IconButton>

      <IconButton sx={buttonStyle} disableRipple>
        <EditIcon sx={iconStyles} />
      </IconButton>

      <IconButton sx={buttonStyle} disableRipple>
        <InfoIcon sx={iconStyles} />
      </IconButton>
    </div>
  );
};
