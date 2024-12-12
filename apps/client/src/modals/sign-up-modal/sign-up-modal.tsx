import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { LogInModal } from '../log-in-modal';

export const SignUpModal: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [validationPassword, setValidationPassword] = useState<string | null>(
    null
  );

  const [areSamePasswords, setAreSamePasswords] = useState<boolean | null>(
    null
  );

  const [allFieldsTyped, setAllFieldsTyped] = useState<boolean | null>(null);

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
  const handleSubmit = () => {
    if (allFieldsTyped && allNotnull) {
      handleMoveToLogIn();
    }
  };
  const [open, setOpen] = useState<boolean>(true);
  const [openLogIn, setOpenLogIn] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMoveToLogIn = () => {
    setOpen(false);
    setOpenLogIn(true);
  };
  const gradineBackgroundColor =
    'linear-gradient(90deg, rgba(127, 163, 185, 1) 0%, rgba(170, 199, 216, 1) 100%)';
  return (
    <>
      <Dialog
        open={open}
        PaperProps={{
          sx: {
            background: gradineBackgroundColor,
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
              marginBottom: '1rem',
            }}
          >
            <TextField
              sx={{
                gridArea: 'username',
              }}
              type="text"
              label="username"
              variant="outlined"
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
                label="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
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
                  setAreSamePasswords(e.target.value === validationPassword);
                  setPassword(e.target.value);
                  checkAllFields(username, e.target.value, validationPassword);
                }}
                value={password}
              />
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
                endAdornment={<InputAdornment position="end" />}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setAreSamePasswords(e.target.value === password);
                  setValidationPassword(e.target.value);
                  checkAllFields(username, password, e.target.value);
                }}
                value={validationPassword}
              />
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
            <Button size="small" variant="contained">
              create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      {openLogIn && <LogInModal />}
    </>
  );
};
