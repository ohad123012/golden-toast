import { Dispatch, FC } from 'react';
import {
  gradientBackgroundColor,
  RootState,
  ToastType,
  useAppSelector,
  useGetAllUsersQuery,
  UserType,
  useGetAllParticipantsForToastIdQuery,
} from '../../store';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import styles from './info-toast-modal.module.css';
interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  toast: ToastType;
}

export const InfoToastModal: FC<Props> = ({
  openModal,
  setOpenModal,
  toast,
}) => {
  const user = useAppSelector((state: RootState) => state.user.value);
  const { data: usersInvitedToToast } = useGetAllParticipantsForToastIdQuery(
    toast.id
  );

  const handleClose = () => {
    setOpenModal(false);
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
  const allUsernamesInvited = usersInvitedToToast?.map((user) => {
    return `${user.username} `;
  });

  return (
    <>
      <Dialog
        open={openModal}
        onClose={() => handleClose()}
        PaperProps={{
          sx: {
            background: gradientBackgroundColor,
            width: '70%',
            maxHeight: '85%',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'black',
          }}
        >
          Info Toast
        </DialogTitle>
        <DialogContent>
          <div className={styles.infoContainer}>
            <p className={styles.infoTitle}> Reason</p>
            <p className={styles.infoContent}> {toast.reason}</p>

            <p className={styles.infoTitle}> Drinks</p>
            <p className={styles.infoContent}> {toast.drinks}</p>

            <p className={styles.infoTitle}> Foods</p>
            <p className={styles.infoContent}> {toast.foods}</p>

            <p className={styles.infoTitle}> Description</p>
            <p className={styles.infoContent}> {toast.description}</p>

            <p className={styles.infoTitle}> Date</p>
            <p className={styles.infoContent}> {dateDispay}</p>

            <p className={styles.infoTitle}> Users Invited</p>
            <p className={styles.infoContent}> {allUsernamesInvited}</p>
          </div>

          <Button
            size="small"
            variant="contained"
            sx={{ marginTop: '1rem' }}
            onClick={() => handleClose()}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
