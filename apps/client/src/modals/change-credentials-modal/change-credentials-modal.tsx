import { Dispatch, FC, useState } from 'react';
import {
  gradientBackgroundColor,
  RootState,
  updateUser,
  useAppDispatch,
  useAppSelector,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  visibilityHoverColor,
  visibilityHoverShadow,
} from '../../store';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}

export const ChangeCredentialsModal: FC<Props> = ({
  openModal,
  setOpenModal,
}) => {
  const { data: users } = useGetAllUsersQuery();

  const [updateUserCredentials] = useUpdateUserMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [usernameExists, setUsernameExists] = useState<boolean>(false);

  const user = useAppSelector((state: RootState) => state.user).value;

  const [username, setUsername] = useState<string>(user!.username);
  const [password, setPassword] = useState<string>(user!.password);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleConfirm = (username: string | null, password: string | null) => {
    const existingUsernames = users?.map((user) => {
      return user.username;
    });

    if (username && password && user) {
      if (existingUsernames?.includes(username ?? '')) {
        setUsernameExists(true);
      } else {
        updateUserCredentials({
          id: user?.id,
          username,
          password,
          isAdmin: user?.isAdmin,
        });
        dispatch(
          updateUser({
            id: user?.id,
            username,
            password,
            isAdmin: user?.isAdmin,
          })
        );
        handleClose();

        toast.success('changed user credentials', {
          position: 'top-right',
          pauseOnHover: false,
          theme: 'dark',
        });
      }
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
            },
          }}
        >
          <DialogTitle
            sx={{
              color: 'black',
            }}
          >
            change user credentials
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
              <TextField
                defaultValue={user?.username}
                type="text"
                label="username"
                error={usernameExists}
                helperText={usernameExists ? 'Username already exists' : ' '}
                variant="outlined"
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
              <FormControl>
                <InputLabel htmlFor="outlined-adornment-password">
                  password
                </InputLabel>
                <OutlinedInput
                  defaultValue={user?.password}
                  type={showPassword ? 'text' : 'password'}
                  label="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        sx={{
                          '&:hover': {
                            backgroundColor: visibilityHoverColor,
                            boxShadow: visibilityHoverShadow,
                          },
                        }}
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
              </FormControl>
            </Box>
            <Button
              disabled={!username || !password}
              size="small"
              variant="contained"
              onClick={() => {
                handleConfirm(username, password);
              }}
              sx={{ marginTop: '1rem' }}
            >
              confirm
            </Button>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};
