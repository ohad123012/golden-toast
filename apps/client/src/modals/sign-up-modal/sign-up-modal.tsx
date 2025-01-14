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
import { Dispatch, FC, useState } from 'react';
import { LogInModal } from '../log-in-modal';
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
  gradientBackgroundColor,
  formHelperTextRedColor,
  visibilityHoverColor,
  visibilityHoverShadow,
} from '../../store';
import { toast } from 'react-toastify';

interface Props {
  logInState: boolean;
  setLogInState: Dispatch<React.SetStateAction<boolean>>;
}

export const SignUpModal: FC<Props> = ({ logInState, setLogInState }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [validationPassword, setValidationPassword] = useState<string | null>(
    null
  );

  const [areSamePasswords, setAreSamePasswords] = useState<boolean>(true);
  const [usernameExists, setUsernameExists] = useState<boolean>(false);
  const [usernameForbidden, setUsernameForbidden] = useState<boolean>(false);

  const { data: users } = useGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();

  const [open, setOpen] = useState<boolean>(true);
  const [openLogIn, setOpenLogIn] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);

    setLogInState(false);
  };
  2;
  const handleMoveToLogIn = () => {
    setOpen(false);
    setOpenLogIn(true);
  };

  const handleSignUp = (
    username: string | null,
    password: string | null,
    validationPassword: string | null
  ) => {
    const specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
    const letters = /[a-zA-Z]/;

    const existingUsernames = users?.map((user) => {
      return user.username;
    });
    if (username && password && validationPassword) {
      const forbiddenUsername =
        username.length < 3 ||
        specialChars.test(username) ||
        !letters.test(username);
      if (
        existingUsernames?.includes(username ?? '') &&
        password !== validationPassword
      ) {
        setPassword('');
        setValidationPassword('');
        setUsernameExists(true);
        setUsernameForbidden(false);
        setAreSamePasswords(false);
      } else if (forbiddenUsername && password !== validationPassword) {
        setUsername('');
        setPassword('');
        setValidationPassword('');
        setUsernameExists(false);
        setUsernameForbidden(true);
        setAreSamePasswords(false);
      } else if (existingUsernames?.includes(username ?? '')) {
        setPassword('');
        setValidationPassword('');
        setUsernameExists(true);
        setAreSamePasswords(true);
      } else if (password !== validationPassword) {
        setPassword('');
        setValidationPassword('');
        setUsernameExists(false);
        setAreSamePasswords(false);
      } else if (forbiddenUsername && password === validationPassword) {
        setUsername('');
        setUsernameForbidden(true);
        setUsernameExists(false);
        setAreSamePasswords(true);
      } else if (
        !existingUsernames?.includes(username ?? '') &&
        password === validationPassword &&
        !forbiddenUsername
      ) {
        createUser({ username, password, isAdmin: false });
        handleMoveToLogIn();

        toast.success('created a user', {
          position: 'top-right',
          pauseOnHover: false,
          theme: 'dark',
        });
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          sx: {
            background: gradientBackgroundColor,
          },
        }}
      >
        <DialogTitle sx={{ color: 'black' }}>Sign Up</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'grid',
              gridTemplateRows: 'auto',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateAreas: `
          'username username'
          'password confirmPassword'`,
              gap: 2,
              marginTop: '0.3rem',
              marginBottom: '0.2rem',
            }}
          >
            <TextField
              sx={{
                gridArea: 'username',
              }}
              type="text"
              label="username"
              variant="outlined"
              error={usernameExists || usernameForbidden}
              slotProps={{ formHelperText: { sx: { marginLeft: '-5%' } } }}
              helperText={
                usernameExists
                  ? 'Username already exists'
                  : usernameForbidden
                  ? 'Username forbidden'
                  : ' '
              }
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
            <FormControl variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={!areSamePasswords}
              >
                password
              </InputLabel>
              <OutlinedInput
                sx={{
                  gridArea: 'password',
                }}
                type={showPassword ? 'text' : 'password'}
                error={!areSamePasswords}
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
              <FormHelperText
                sx={{ color: formHelperTextRedColor, marginLeft: '0' }}
              >
                {!areSamePasswords ? 'Passwords are not the same' : ' '}
              </FormHelperText>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={!areSamePasswords}
              >
                same password
              </InputLabel>
              <OutlinedInput
                sx={{
                  gridArea: 'confirmPassword',
                }}
                type="password"
                label="same password"
                error={!areSamePasswords}
                endAdornment={<InputAdornment position="end" />}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setValidationPassword(e.target.value);
                }}
                value={validationPassword}
              />
              <FormHelperText
                sx={{ color: formHelperTextRedColor, marginLeft: '0' }}
              >
                {!areSamePasswords ? 'Passwords are not the same' : ' '}
              </FormHelperText>
            </FormControl>
          </Box>
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
              disabled={!username || !password || !validationPassword}
              onClick={() =>
                handleSignUp(username, password, validationPassword)
              }
            >
              log in
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      {openLogIn && (
        <LogInModal openModal={logInState} setOpenModal={setLogInState} />
      )}
    </>
  );
};
