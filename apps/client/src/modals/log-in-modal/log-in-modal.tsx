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
import { useState } from 'react';

import { SignUpModal } from '../sign-up-modal';

export const LogInModal = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [allFieldsTyped, setAllFieldsTyped] = useState<boolean | null>(null);
  const [doesUserExist, setDoesUserExist] = useState<boolean | null>(null);

  const [open, setOpen] = useState<boolean>(true);
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleConfirm = () => {
    setOpen(false);
  };
  const handleMoveToSignUp = () => {
    setOpen(false);
    setOpenSignUp(true);
  };

  const checkAllFields = (username: string | null, password: string | null) => {
    const allFieldValues = !!username && !!password;
    if (allFieldValues) {
      setAllFieldsTyped(true);
    } else {
      setAllFieldsTyped(false);
    }
  };
  const allNotnull = !!username && !!password;
  const gradineBackgroundColor =
    'linear-gradient(90deg, rgba(127, 163, 185, 1) 0%, rgba(170, 199, 216, 1) 100%)';

  //   useEffect(() => {
  //     if (allFieldsTyped && allNotnull) {
  //       users?.find((user) => {
  //         if (user.password === password && user.username === username) {
  //           dispatch(updateUser(user));
  //           setDoesUserExist(true);
  //           return user;
  //         } else {
  //           setDoesUserExist(false);
  //         }
  //       });
  //     }
  //   }, [username, password]);

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
        <DialogTitle
          sx={{
            color: 'black',
          }}
        >
          Welcome to golden-toast by Ohad Lazar
        </DialogTitle>
        <DialogContent sx={{ overflow: 'initial' }}>
          <DialogContentText>Please log in</DialogContentText>
          <Box
            dir="ltr"
            sx={{
              display: 'flex',
              gridTemplateColumns: { sm: '1fr 1fr ' },
              gap: 2,
              margin: '1rem',
            }}
          >
            <TextField
              type="text"
              label="username"
              variant="outlined"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setUsername(e.target.value);
                checkAllFields(e.target.value, password);
              }}
              value={username}
            />
            <FormControl>
              <InputLabel htmlFor="outlined-adornment-password">
                password
              </InputLabel>
              <OutlinedInput
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
                  setPassword(e.target.value);
                  checkAllFields(username, e.target.value);
                }}
                value={password}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gridTemplateColumns: { sm: '1fr 1fr ' },
              gap: 2,
              margin: '1rem',

              justifyContent: 'flex-end',
              boxShadow: 'none',
            }}
          >
            <Button
              size="small"
              variant="contained"
              onClick={() => handleMoveToSignUp()}
            >
              sign up
            </Button>
            <Button size="small" variant="contained">
              confirm
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      {openSignUp ? <SignUpModal /> : 0}
    </>
  );
};
