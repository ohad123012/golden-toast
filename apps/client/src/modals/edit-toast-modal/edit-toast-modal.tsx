import { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  gradientBackgroundColor,
  RootState,
  ToastType,
  useAppSelector,
  useGetAllUsersQuery,
  UserType,
  useGetAllParticipantsForToastIdQuery,
  useGetUserByUserIdQuery,
  useLazyGetUserByUserIdQuery,
  useUpdateToastMutation,
  useDeleteToastParticipantMutation,
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { toast as toastify } from 'react-toastify';

interface Props {
  openModal?: boolean;
  setOpenModal?: Dispatch<React.SetStateAction<boolean>>;
  toast: ToastType;
}

export const EditToastModal: FC<Props> = ({
  openModal,
  setOpenModal,
  toast,
}) => {
  const [toastDate, setToastDate] = useState<Date | null>(
    toast.toastDate ?? Date
  );
  const [reason, setReason] = useState<string | null>(toast.reason);
  const [drinks, setDrinks] = useState<string | null>(toast.drinks);
  const [foods, setFoods] = useState<string | null>(toast.foods);
  const [description, setDescription] = useState<string | null>(
    toast.description
  );

  const user = useAppSelector((state: RootState) => state.user).value;
  const { data: usersInvitedToToast } = useGetAllParticipantsForToastIdQuery(
    toast.id
  );

  const [areAllFieldsTyped, setAreAllFieldsTyped] = useState<boolean>(true);
  const [invitedUsers, setInvitedUsers] = useState<UserType[] | null>(
    usersInvitedToToast ?? []
  );

  const checkAllFields = (
    reason: string | null,
    drinks: string | null,
    foods: string | null,
    description: string | null,
    toastDate: Date | null
  ) => {
    const areAllFieldValuesTyped =
      !!reason && !!drinks && !!foods && !!description && !!toastDate;

    if (areAllFieldValuesTyped) {
      setAreAllFieldsTyped(true);
    } else {
      setAreAllFieldsTyped(false);
    }
  };
  const handleClose = () => {
    if (openModal && setOpenModal) {
      setOpenModal(false);
    }
  };
  const areAllNotnull =
    !!reason && !!drinks && !!foods && !!description && !!toastDate;
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
      updateToast({
        id: toast.id,
        userId: user.id,
        toastDate,
        reason,
        drinks,
        foods,
        description,
        hasDone: false,
      });

      const wasInvitedAndGotDeleted = usersInvitedToToast?.filter(
        (e) => !invitedUsers?.includes(e)
      );

      const wasNotInvitedAndGotAdded = invitedUsers?.filter(
        (e) => !usersInvitedToToast?.includes(e)
      );

      inviteNewUsers(wasNotInvitedAndGotAdded, toast.id);
      removeInviteFromUsers(wasInvitedAndGotDeleted, toast.id);

      handleClose();
      toastify.success('toast edited', {
        position: 'top-right',
        pauseOnHover: false,
        theme: 'dark',
      });
    }
  };

  return (
    <div>
      <>
        <Dialog
          open={openModal ?? false}
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
          <DialogContent sx={{ overflow: 'initial' }}>
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
                  checkAllFields(
                    e.target.value,
                    drinks,
                    foods,
                    description,
                    toastDate
                  );
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
                  checkAllFields(
                    reason,
                    e.target.value,
                    foods,
                    description,
                    toastDate
                  );
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
                  checkAllFields(
                    reason,
                    drinks,
                    e.target.value,
                    description,
                    toastDate
                  );
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
                  checkAllFields(
                    reason,
                    drinks,
                    foods,
                    e.target.value,
                    toastDate
                  );
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
                    checkAllFields(reason, drinks, foods, description, date);
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
              disabled={!areAllFieldsTyped || !areAllNotnull}
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
    </div>
  );
};
