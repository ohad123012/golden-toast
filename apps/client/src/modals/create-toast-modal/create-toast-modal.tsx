import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  gradientBackgroundColor,
  useCreateToastMutation,
  useAppSelector,
  RootState,
  useGetAllUsersQuery,
  UserType,
} from '../../store';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { toast } from 'react-toastify';
import { useCreateToastParticipantsMutation } from '../../store/services/toast-participant.api';

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}

export const CreateToastModal: FC<Props> = ({ openModal, setOpenModal }) => {
  const [toastDate, setToastDate] = useState<Date | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [drinks, setDrinks] = useState<string | null>(null);
  const [foods, setFoods] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [invitedUsers, setInvitedUsers] = useState<UserType[] | null>(null);

  const user = useAppSelector((state: RootState) => state.user).value;

  const [createToastParticipants] = useCreateToastParticipantsMutation();
  const [createToast] = useCreateToastMutation();
  const { data: users } = useGetAllUsersQuery();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCreate = (
    toastDate: Date | null,
    reason: string | null,
    drinks: string | null,
    foods: string | null,
    description: string | null
  ) => {
    if (
      !!reason &&
      !!drinks &&
      !!foods &&
      !!toastDate &&
      !!description &&
      !!user
    ) {
      const toastCreated = createToast({
        userId: user.id,
        toastDate,
        reason,
        drinks,
        foods,
        description,
        hasDone: false,
      });

      toastCreated.then((result) => {
        const toastId = result.data ? result.data.id : '';

        const allToastParticipants = invitedUsers?.map(
          (invitedUser: UserType) => {
            const userId = invitedUser.id;
            return { userId, toastId };
          }
        );
        createToastParticipants(allToastParticipants ?? []);
      });

      handleClose();
      toast.success('toast created', {
        position: 'top-right',
        pauseOnHover: false,
        theme: 'dark',
      });
    }
  };
  return (
    <>
      <Dialog
        open={openModal}
        onClose={() => handleClose()}
        PaperProps={{
          sx: {
            background: gradientBackgroundColor,
            width: '70%',
            minHeight: '80%',
            maxHeight: '85%',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'black',
          }}
        >
          Create Toast
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gridTemplateColumns: { sm: '1fr ' },
              gap: 2,
              margin: '0.4rem',
              padding: '0 2rem',
            }}
          >
            <TextField
              type="text"
              label="reason"
              variant="outlined"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setReason(e.target.value);
              }}
              value={reason}
            />
            <TextField
              type="text"
              label="drinks"
              variant="outlined"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setDrinks(e.target.value);
              }}
              value={drinks}
            />

            <TextField
              type="text"
              label="foods"
              variant="outlined"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setFoods(e.target.value);
              }}
              value={foods}
            />

            <TextField
              type="text"
              label="description"
              variant="outlined"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setDescription(e.target.value);
              }}
              value={description}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disablePast={!user?.isAdmin}
                label="toast date"
                sx={{ fontSize: '100rem' }}
                timeSteps={{ minutes: 15 }}
                onChange={(date: Date | null) => {
                  setToastDate(date);
                }}
                value={toastDate}
              />
            </LocalizationProvider>

            <Autocomplete
              multiple
              id="tags-outlined"
              options={users ?? []}
              getOptionLabel={({ username }) => username}
              filterSelectedOptions
              value={invitedUsers ?? []}
              onChange={(_, newValue: SetStateAction<UserType[] | null>) => {
                setInvitedUsers(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="invited users"
                  placeholder="User"
                />
              )}
            />
          </Box>
          <Button
            size="small"
            variant="contained"
            disabled={
              !reason || !drinks || !foods || !description || !toastDate
            }
            onClick={() =>
              handleCreate(toastDate, reason, drinks, foods, description)
            }
            sx={{ marginTop: '1rem' }}
          >
            create
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
