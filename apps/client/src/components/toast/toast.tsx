import { FC, PropsWithChildren, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import styles from './toast.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import {
  ToastType,
  useDeleteToastMutation,
  useGetUserByUserIdQuery,
  useDeleteAllToastParticipantsForToastIdMutation,
  buttonStyle,
  iconStyles,
  iconColor,
  checkButtonStyle,
  checkIconStyle,
  useUpdateUserMutation,
  useUpdateToastMutation,
} from '../../store';
import { IconButton } from '@mui/material';
import { EditToastModal } from '../../modals';

interface Props {
  toast: ToastType;
}

export const Toast: FC<Props & PropsWithChildren> = ({ toast }) => {
  const [openEditToast, setOpenEditToast] = useState<boolean>(false);

  const { data: userForToast } = useGetUserByUserIdQuery(toast.userId);
  const [deleteToast] = useDeleteToastMutation();
  const [deleteToastParticipants] =
    useDeleteAllToastParticipantsForToastIdMutation();
  const [updateToast] = useUpdateToastMutation();
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
        <p>
          {new Date(new Date(toast.toastDate).getTime() + 2 * 60 * 60 * 1000)
            .toISOString()
            .replace('Z', '')
            .replace('T', ' ')}
        </p>
      </div>

      <IconButton
        sx={buttonStyle}
        disableRipple
        onClick={() => handleDeleteToast()}
      >
        <DeleteIcon sx={iconStyles} />
      </IconButton>

      <IconButton
        sx={buttonStyle}
        disableRipple
        onClick={() => setOpenEditToast(true)}
      >
        <EditIcon sx={iconStyles} />
      </IconButton>

      <IconButton sx={buttonStyle} disableRipple>
        <InfoIcon sx={iconStyles} />
      </IconButton>

      {openEditToast && (
        <EditToastModal
          openModal={openEditToast}
          setOpenModal={setOpenEditToast}
          toast={toast}
        />
      )}
    </div>
  );
};
