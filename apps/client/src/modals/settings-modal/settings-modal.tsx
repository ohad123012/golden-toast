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
  useAppDispatch,
  gradientBackgroundColor,
  updateUser,
  UserType,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useDeleteAllToastParticipantsForUserIdMutation,
  useUpdateUserMutation,
  useUpdateUserToAdminMutation,
} from '../../store';

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  setLogInState: Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
}

export const SettingsModal: FC<Props> = ({
  openModal,
  setOpenModal,
  setLogInState,
  user,
}) => {
  const dispatch = useAppDispatch();
  const [usersToAdmin, setUsersToAdmin] = useState<UserType[] | null>(null);
  const [usersToDelete, setUsersToDelete] = useState<UserType[] | null>(null);
  const [DeleteUser] = useDeleteUserMutation();
  const [deleteToastParticipantsUser] =
    useDeleteAllToastParticipantsForUserIdMutation();
  const [updateUserToAdmin] = useUpdateUserToAdminMutation();
  const { data: users } = useGetAllUsersQuery();
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleLogOut = () => {
    dispatch(updateUser(null));

    setOpenModal(false);
    setLogInState(false);
  };

  const handleConfirm = () => {
    usersToDelete?.map((userToDelete) => {
      DeleteUser(userToDelete.id);
      deleteToastParticipantsUser(userToDelete.id);
    });

    usersToAdmin?.map((userToAdmin) => {
      updateUserToAdmin({ id: userToAdmin.id, isAdmin: true });
    });
    setOpenModal(false);
  };

  return (
    <div>
      <>
        <Dialog
          open={openModal}
          onClose={() => handleClose()}
          PaperProps={{
            sx: user?.isAdmin
              ? {
                  background: gradientBackgroundColor,
                  width: '30%',
                }
              : {
                  background: gradientBackgroundColor,
                },
          }}
        >
          <DialogTitle
            sx={{
              color: 'black',
            }}
          >
            Settings
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gridTemplateColumns: { sm: '1fr' },
                gap: '1rem',
                margin: '0.2rem',
              }}
            >
              {user?.isAdmin && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={users ?? []}
                  getOptionLabel={({ username }) => username}
                  filterSelectedOptions
                  value={usersToDelete ?? []}
                  onChange={(
                    _,
                    newValue: SetStateAction<UserType[] | null>
                  ) => {
                    setUsersToDelete(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="user to delete"
                      placeholder="User"
                    />
                  )}
                />
              )}

              {user?.isAdmin && (
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={users ?? []}
                  getOptionLabel={({ username }) => username}
                  filterSelectedOptions
                  value={usersToAdmin ?? []}
                  onChange={(
                    _,
                    newValue: SetStateAction<UserType[] | null>
                  ) => {
                    setUsersToAdmin(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="user to admin"
                      placeholder="User"
                    />
                  )}
                />
              )}
            </Box>

            {user?.isAdmin && (
              <Box
                sx={{
                  display: 'flex',
                  gridTemplateColumns: { sm: '1fr 1fr ' },
                  gap: 2,
                  paddingTop: '0.5rem',
                  justifyContent: 'flex-end',
                  boxShadow: 'none',
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    handleLogOut();
                  }}
                  sx={{ marginTop: '3%' }}
                >
                  Logout
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    handleConfirm();
                  }}
                  sx={{ marginTop: '3%' }}
                >
                  Confirm
                </Button>
              </Box>
            )}
            {!user?.isAdmin && (
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  handleLogOut();
                }}
                sx={{ marginTop: '3%' }}
              >
                Logout
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};
