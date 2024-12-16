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
import { FC, useState } from 'react';
import { LogInModal } from '../log-in-modal';
import {
  useCreateUserMutation,
  useGetAllUsersQuery,
  gradientBackgroundColor,
  formHelperTextRedColor,
  visibilityHoverColor,
  visibilityHoverShadow,
} from '../../store';

export const SignUpModal: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [validationPassword, setValidationPassword] = useState<string | null>(
    null
  );

  const [areSamePasswords, setAreSamePasswords] = useState<boolean>(true);
  const [usernameExists, setUsernameExists] = useState<boolean>(false);

  const [allFieldsTyped, setAllFieldsTyped] = useState<boolean>(true);
  const { data: users } = useGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();

  const checkAllFields = (
    username: string | null,
    password: string | null,
    validationPassword: string | null
  ) => {
    const allFieldValues = !!username && !!password && !!validationPassword;

    if (allFieldValues) {
      setAllFieldsTyped(true);
    } else {
      setAllFieldsTyped(false);
    }
  };

  const allNotnull = !!username && !!password;

  const [open, setOpen] = useState<boolean>(true);
  const [openLogIn, setOpenLogIn] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleMoveToLogIn = () => {
    setOpen(false);
    setOpenLogIn(true);
  };

  const handleSignUp = (
    username: string | null,
    password: string | null,
    validationPassword: string | null
  ) => {
    const existingUsernames = users?.map((user) => {
      return user.username;
    });
    if (username && password && validationPassword) {
      if (
        existingUsernames?.includes(username ?? '') &&
        password !== validationPassword
      ) {
        setPassword('');
        setValidationPassword('');
        setUsernameExists(true);
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
      }

      if (
        !existingUsernames?.includes(username ?? '') &&
        password === validationPassword
      ) {
        createUser({ username, password, isAdmin: false });
        handleMoveToLogIn();
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
        <DialogTitle sx={{ color: 'black' }}>sign up</DialogTitle>
        <DialogContent sx={{ overflow: 'initial' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateRows: 'auto',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateAreas: `
          'username username'
          'password confirmPassword'`,
              gap: 2,
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
              error={usernameExists}
              helperText={usernameExists ? 'Username already exists' : ' '}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setUsername(e.target.value);
                checkAllFields(e.target.value, password, validationPassword);
              }}
              value={username}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
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
                  checkAllFields(username, e.target.value, validationPassword);
                }}
                value={password}
              />
              <FormHelperText sx={{ color: formHelperTextRedColor }}>
                {!areSamePasswords ? 'Passwords are the same' : ' '}
              </FormHelperText>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
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
                  checkAllFields(username, password, e.target.value);
                }}
                value={validationPassword}
              />
              <FormHelperText sx={{ color: formHelperTextRedColor }}>
                {!areSamePasswords ? 'Passwords are the same' : ' '}
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
              onClick={() => handleMoveToLogIn()}
            >
              log in
            </Button>
            <Button
              size="small"
              variant="contained"
              disabled={!allFieldsTyped || !allNotnull}
              onClick={() =>
                handleSignUp(username, password, validationPassword)
              }
            >
              create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      {openLogIn && <LogInModal />}
    </>
  );
};
