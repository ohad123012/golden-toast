import { FC, PropsWithChildren, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import styles from './toast.module.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';

import CheckIcon from '@mui/icons-material/Check';
import {
  ToastType,
  UserType,
  useDeleteToastMutation,
  useGetUserByUserIdQuery,
  useDeleteAllToastParticipantsForToastIdMutation,
  buttonStyle,
  iconStyles,
  iconColor,
  checkIconStyle,
  useUpdateToastHasDoneMutation,
  checkButtonStyle,
  useCreateCriminalMutation,
  iconDisabledStyle,
} from '../../store';
import { IconButton } from '@mui/material';
import { EditToastModal, InfoToastModal } from '../../modals';
import { Gavel } from '@mui/icons-material';

interface Props {
  toast: ToastType;
  user: UserType;
}

export const Toast: FC<Props & PropsWithChildren> = ({ toast, user }) => {
  const greenHasDone = '#76ba96';
  const redNotDoneInTime = '#C97B7B';
  const [openEditToast, setOpenEditToast] = useState<boolean>(false);
  const [openInfoToast, setOpenInfoToast] = useState<boolean>(false);
  const { data: userForToast } = useGetUserByUserIdQuery(toast.userId);
  const [createCriminal] = useCreateCriminalMutation();
  const [deleteToast] = useDeleteToastMutation();
  const [deleteToastParticipants] =
    useDeleteAllToastParticipantsForToastIdMutation();
  const [updateToastHasDone] = useUpdateToastHasDoneMutation();
  const handleDeleteToast = () => {
    deleteToast(toast.id);
    deleteToastParticipants(toast.id);
  };
  const removeSecondsMillis = new Date(
    new Date(toast.toastDate).setSeconds(0, 0)
  );

  const dateDispay = new Date(
    removeSecondsMillis.getTime() + 2 * 60 * 60 * 1000
  )
    .toISOString()
    .replace('Z', '')
    .replace('T', ' ')
    .replace(':00.000', '');

  return (
    <div
      className={styles.box}
      style={
        user.isAdmin
          ? toast.hasDone
            ? { borderColor: greenHasDone }
            : { borderColor: redNotDoneInTime }
          : {}
      }
    >
      <div className={styles.toast}>
        <div className={styles.user}>
          <PersonIcon
            sx={{ backgroundColor: 'transparent', fill: iconColor }}
          />
          {userForToast?.username}
        </div>
        <p> {toast.reason} </p>
        <div className={styles.date}>
          <p>{dateDispay}</p>
        </div>
        <div className={styles.buttonsContainer}>
          <IconButton sx={buttonStyle} onClick={() => handleDeleteToast()}>
            <DeleteIcon sx={iconStyles} />
          </IconButton>

          <IconButton
            sx={buttonStyle}
            disabled={user.id !== toast.userId && !user?.isAdmin}
            onClick={() => setOpenEditToast(true)}
          >
            <EditIcon
              sx={
                user.id !== toast.userId && !user?.isAdmin
                  ? iconDisabledStyle
                  : iconStyles
              }
            />
          </IconButton>

          <IconButton sx={buttonStyle} onClick={() => setOpenInfoToast(true)}>
            <InfoIcon sx={iconStyles} />
          </IconButton>
        </div>
        {openEditToast && (
          <EditToastModal
            openModal={openEditToast}
            setOpenModal={setOpenEditToast}
            toast={toast}
          />
        )}
        {openEditToast && (
          <EditToastModal
            openModal={openEditToast}
            setOpenModal={setOpenEditToast}
            toast={toast}
          />
        )}
        {openInfoToast && (
          <InfoToastModal
            openModal={openInfoToast}
            setOpenModal={setOpenInfoToast}
            toast={toast}
          />
        )}
      </div>

      {user.isAdmin && (
        <IconButton sx={checkButtonStyle}>
          <CheckIcon
            sx={checkIconStyle}
            onClick={() =>
              updateToastHasDone({
                id: toast.id,
                hasDone: true,
              })
            }
          />
        </IconButton>
      )}

      {user.isAdmin && (
        <IconButton sx={checkButtonStyle}>
          <Gavel
            sx={checkIconStyle}
            onClick={() =>
              createCriminal({ userId: toast.userId, isPersonaNonGrata: false })
            }
          />
        </IconButton>
      )}
    </div>
  );
};
