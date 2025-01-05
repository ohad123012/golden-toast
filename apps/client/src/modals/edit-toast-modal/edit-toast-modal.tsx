import { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  gradientBackgroundColor,
  RootState,
  ToastType,
  useAppSelector,
  useGetAllUsersQuery,
  UserType,
  useGetAllParticipantsForToastIdQuery,
  useUpdateToastMutation,
  useCreateToastParticipantsMutation,
  useDeleteToastParticipantByToastIdAndUserIdMutation,
} from '../../store';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { toast as toastify } from 'react-toastify';

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  toast: ToastType;
}

export const EditToastModal: FC<Props> = ({
  openModal,
  setOpenModal,
  toast,
}) => {
  const MOCK_USER: UserType[] = [
    {
      id: '1',
      username: 'mock user for test',
      password: 'string',
      isAdmin: false,
    },
  ];
  const [toastDate, setToastDate] = useState<Date | null>(
    new Date(toast.toastDate)
  );
  const [reason, setReason] = useState<string>(toast.reason);
  const [drinks, setDrinks] = useState<string>(toast.drinks);
  const [foods, setFoods] = useState<string>(toast.foods);
  const [description, setDescription] = useState<string>(toast.description);

  const user = useAppSelector((state: RootState) => state.user).value;
  const { data: usersInvitedToToast, isLoading: loadingUsers } =
    useGetAllParticipantsForToastIdQuery(toast.id);

  const [invitedUsers, setInvitedUsers] = useState<UserType[]>(
    usersInvitedToToast ?? []
  );

  const handleClose = () => {
    setOpenModal(false);
  };

  const { data: users } = useGetAllUsersQuery();
  const [updateToast] = useUpdateToastMutation();
  const [deleteToastParticipantByUserToast] =
    useDeleteToastParticipantByToastIdAndUserIdMutation();
  const [createToastParticipants] = useCreateToastParticipantsMutation();

  const inviteNewUsers = (
    wasNotInvitedAndGotAdded: UserType[] | undefined,
    toastId: string
  ) => {
    const allUserIdsInvited = wasNotInvitedAndGotAdded?.map((userToAdd) => {
      const userId = userToAdd.id;

      return { userId, toastId };
    });

    createToastParticipants(allUserIdsInvited ?? []);
  };
  const removeInviteFromUsers = (
    wasInvitedAndGotDeleted: UserType[] | undefined,
    toastId: string
  ) => {
    wasInvitedAndGotDeleted?.map((userToDelete) => {
      const userId = userToDelete.id;
      deleteToastParticipantByUserToast({ userId, toastId });
    });
  };
  const handleCreate = (
    toastDate: Date | null,
    reason: string,
    drinks: string,
    foods: string,
    description: string
  ) => {
    if (
      !!reason &&
      !!drinks &&
      !!foods &&
      !!toastDate &&
      !!description &&
      !!user
    ) {
      updateToast({
        id: toast.id,
        userId: user.id,
        toastDate,
        reason,
        drinks,
        foods,
        description,
      });

      const userWasInvitedAndGotDeleted = usersInvitedToToast?.filter(
        (e) => !invitedUsers?.includes(e)
      );

      const userWasNotInvitedAndGotAdded = invitedUsers?.filter(
        (e) => !usersInvitedToToast?.includes(e)
      );

      inviteNewUsers(userWasNotInvitedAndGotAdded, toast.id);
      removeInviteFromUsers(userWasInvitedAndGotDeleted, toast.id);

      handleClose();
      toastify.success('toast edited', {
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
          Edit Toast
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
                timezone="system"
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
              // value={invitedUsers ?? []}
              value={loadingUsers ? MOCK_USER : invitedUsers}
              onChange={(_, newValue: SetStateAction<UserType[]>) => {
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
            sx={{ marginTop: '1rem' }}
            onClick={() =>
              handleCreate(toastDate, reason, drinks, foods, description)
            }
          >
            Edit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
